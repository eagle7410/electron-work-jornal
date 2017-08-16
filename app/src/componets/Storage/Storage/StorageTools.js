import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import StorageProjectsList from '../share/StorageProjectsList'
import {StorageFilters, Storage} from '../../../const/Events'
import DropDownList from '../../tools/DropDownList'

const stylePanagation = {maxWidth: '30px'};
const StoreTools = (state) => {
	let filters = state.filters;
	let store = state.storage;

	const changeCountInPage = (ev, val) => {
		val = Number(val);

		if (isNaN(val) || val === 0) {
			return;
		}

		state.changeCountInPage(val);
	}

	const changeFilter = (project, date) => {
		let hours = 0;
		let hoursFact = 0;
		let rows = store.data.filter(row => {
			if (row.project !== project || row.date_doit.substr(0, 10) !== date)
				return false;

			hours += Number(row.hours) || 0;
			hoursFact += Number(row.hours_fact) || 0;

			return true;
		});

		state.changeFiltes({
			rows : rows,
			hoursInDate       : hours,
			hoursFactInDate   : hoursFact,
			filterDate        : date,
			categorySelect    : project
		});
	}

	const changeProject = (event, index, value) => changeFilter(value, filters.filterDate);
	const changeDate    = (event, index, value) => changeFilter(filters.categorySelect, value);

	return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text='Tools' />
				<IconButton
					tooltip='Search'
					touch={true}
					tooltipPosition='bottom-right'
				>
					<ActionSearch
						hoverColor={filters.searchIcoActive}
						color={filters.searchIcoNow}
						onTouchTap={state.changeShowSearchText}
					/>
				</IconButton>
				{
					filters.showSearchText
						? <TextField id='inputSearch' hintText='Enter for search' onChange ={state.changeSearchText}/>
						: <span/>
				}
				<ToolbarSeparator />
					<StorageProjectsList onEdit={changeProject} showAll={true} val={filters.categorySelect} />
				<ToolbarSeparator />
					<DropDownList onEdit={changeDate} val={filters.filterDate} list={state.storage.dates} />
					&nbsp;hours: {filters.hoursInDate}&nbsp;hoursFact: {filters.hoursFactInDate}
				<ToolbarSeparator />
				&nbsp;Count in page&nbsp;
				<TextField style={stylePanagation} onChange={changeCountInPage} value={state.pagination.split} id='inputPagi' hintText='Enter count record in page' />
			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		filters : state.storageFilters,
		pagination : state.storagePagination,
		storage : state.storage
	}),
	dispatch => ({
		changeFiltes      : data => dispatch({type : StorageFilters.chFilter, data : data}),
		changeCountInPage : val => dispatch({type : Storage.changeCountInPage, data : val}),
		changeSearchText     : (ev, val) => dispatch({type: StorageFilters.chText, data: val.toLowerCase()}),
		changeShowSearchText : ev => dispatch({type: StorageFilters.toggleText, data: ev.target.value})
	})
)(StoreTools);
