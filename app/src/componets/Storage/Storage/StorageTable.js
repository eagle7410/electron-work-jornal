import React from 'react';
import {connect} from 'react-redux';
import RowShow from './StorageRowShow';
import RowEdit from './StorageRowEdit';
import {Table, TableBody, TableHeader, TableFooter, TableRowColumn, TableHeaderColumn, TableRow} from 'material-ui/Table';
import Pagination from 'material-ui-pagination';
import {Storage, StorageFilters} from '../../../const/Events'
import EmptyRow from '../../tools/EmptyRow'

const StorageTable = (state) => {
	let store = state.store;
	let filters = state.filters;
	let pagination = state.pagination;
	let filterCategory = filters.categorySelect;
	let rows = filters.rows;
	let total = Math.ceil(rows.length / pagination.split);
	let startIndex = (pagination.number - 1 ) * pagination.split;

	rows = rows.slice(startIndex, startIndex + pagination.split);

	return (
		<Table fixedHeader={true} selectable={false}>
			<TableHeader displaySelectAll={false}>
				<TableRow>
					<TableHeaderColumn >Actions, Main data</TableHeaderColumn>
					<TableHeaderColumn >Description</TableHeaderColumn>
				</TableRow>
			</TableHeader>
			<TableBody displayRowCheckbox={false} showRowHover={true}>
				{
					total === 0
						? <EmptyRow key='empty-row' col='2'/>
						: rows.map((row, inx) =>
						row.id === store.editRow
							? <RowEdit key={`store_${row.id}`} />
							: <RowShow key={`store_${row.id}`} row={row} />
					)
				}
			</TableBody>
			{
				total < 2
					? <TableFooter/>
					: <TableFooter>
						<TableRow>
							<TableRowColumn colSpan='2'>
								now {pagination.number} from {total}
								<Pagination
									total = { total }
									current = { pagination.number }
									display = { pagination.display }
									onChange = { number => state.onChangePage(number) }
								/>
							</TableRowColumn>
						</TableRow>
					</TableFooter>
			}

		</Table>
	);
};

export default connect(
	state => ({
		store: state.storage,
		filters : state.storageFilters,
		pagination : state.storagePagination
	}),
	dispatch => ({
		onChangePage : num => dispatch({type : Storage.changePage, data : num}),
		onSetHours : data => dispatch({type : StorageFilters.setHours, data : data})
	})
)(StorageTable);
