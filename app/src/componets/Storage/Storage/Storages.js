import React from 'react';
import {connect} from 'react-redux';
import Tools from './StorageTools'
import Table from './StorageTable'
import Paper from 'material-ui/Paper';
import FilterDateMode from '../../../const/FilterDateMode'

const Storages = (state) => {
	let store = state.store;
	let filters = state.filters;
	let pagination = state.pagination;
	let startIndex = (pagination.number - 1 ) * pagination.split;


	let from = filters.dateFrom;
	let to = filters.dateTo;
	let date = filters.filterDate;
	let mode = filters.filterDateMode;
	let	projectAll = filters.projectAll;

	let hours = 0;
	let hoursFact = 0;
	let rows = store.data.filter(row => {

		let date_doit = row.date_doit.substr(0, 10);

		if (
			mode !== FilterDateMode.noUse &&
			(mode === FilterDateMode.useDate && date_doit !== date) ||
			(
				mode === FilterDateMode.useRange &&
				(
					(from && date_doit < from) ||
					(to && date_doit > to)
				)
			)
		) {
			return false;
		}

		if (!projectAll && row.project !== filters.projectSelect) {
			return false;
		}

		hours += Number(row.hours) || 0;
		hoursFact += Number(row.hours_fact) || 0;

		return true;
	});

	let total = Math.ceil(rows.length / pagination.split);

	rows = rows.slice(startIndex, startIndex + pagination.split);


	return (
		<div>
			<Paper zDepth={2}><Tools hours={hours} hoursFact={hoursFact}/></Paper>
			<Table rows={rows} total={total}/>
		</div>
	);
}

export default connect(
	state => ({
		store: state.storage,
		filters : state.storageFilters,
		pagination : state.storagePagination
	})
)(Storages);
