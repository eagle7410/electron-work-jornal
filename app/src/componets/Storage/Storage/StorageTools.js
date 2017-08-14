import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import StorageProjectsList from '../share/StorageProjectsList'
import {StorageFilters, Storage} from '../../../const/Events'

const StoreTools = (state) => {
	let filters = state.filters;
	const changeCountInPage = (ev, val) => {
		val = Number(val);

		if (isNaN(val) || val === 0) {
			return;
		}

		state.changeCountInPage(val);
	}

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

				<StorageProjectsList onEdit={state.changeCategory} showAll={true} val={filters.categorySelect} />
				<ToolbarSeparator />
				&nbsp;Count in page&nbsp;<TextField onChange={changeCountInPage} value={state.pagination.split} id='inputPagi' hintText='Enter count record in page' />
			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		filters : state.storageFilters,
		pagination : state.storagePagination
	}),
	dispatch => ({
		changeCountInPage : val => dispatch({type : Storage.changeCountInPage, data : val}),
		changeCategory       : (event, index, value) => dispatch({type: StorageFilters.chCat, data: value}),
		changeSearchText     : (ev, val) => dispatch({type: StorageFilters.chText, data: val.toLowerCase()}),
		changeShowSearchText : ev => dispatch({type: StorageFilters.toggleText, data: ev.target.value})
	})
)(StoreTools);
