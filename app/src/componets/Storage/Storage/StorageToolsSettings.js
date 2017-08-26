import React from 'react';
import {connect} from 'react-redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import StorageProjectsList from '../share/StorageProjectsList'
import DropDownList from '../../tools/DropDownList'
import FilterDateMode from '../../../const/FilterDateMode'

const LabelGroup = (state) => {
	return <Paper style={styleGroupLabel}><b>{state.text}</b></Paper>;
};

const StorageToolsSettings = (state) => {
	let filters = state.filters;

    const changeProject = (event, index, value) => state.onChange(value, filters.filterDate);
    const changeDate    = (event, index, value) => state.onChange(filters.projectSelect, value);
    const changeDatesMode = (ev, val) => state.onChange(filters.projectSelect, filters.filterDate, val);
	const changeProjectAll = (ev, val) => state.onChange(filters.projectSelect, filters.filterDate, null, !val);

    const contentDates = () => {
		switch (filters.filterDateMode) {
			case FilterDateMode.useDate:
				return <DropDownList
					onEdit={changeDate}
					val={filters.filterDate}
					list={state.storage.dates}
				/>;
			default :
				return false;
		}
	};

    const contentProject = () => {
    	return filters.projectAll
            ? false
            : <StorageProjectsList
				onEdit={changeProject}
				showAll={true}
				val={filters.projectSelect}
				disabled={filters.projectAll}
			/>;

	};

	return (
		<div style={filters.extToolsOpen ? style.settWarp : style.settWarpClose}>
			<Paper
				style={style.sett}
				className={filters.extToolsOpen ? 'tools-ext-open' : 'tools-ext-close'}
			>
				<LabelGroup text="Date setting"/>

				<RadioButtonGroup
					valueSelected={filters.filterDateMode}
					onChange={changeDatesMode}
					name="dates_name"
				>
					<RadioButton
						value={FilterDateMode.noUse}
						label="Not use"
					/>
					<RadioButton
						value={FilterDateMode.useDate}
						label="Use date"
					/>
					<RadioButton
						value={FilterDateMode.useRange}
						label="Use date range"
					/>
				</RadioButtonGroup>
				{contentDates()}
				<LabelGroup text="Use project filter"/>
				<Toggle
					toggled={!filters.projectAll}
					onToggle={changeProjectAll}
				/>
				{contentProject()}
				<LabelGroup text="Search task"/>
				<Toggle/>
			</Paper>
		</div>
	);
};

export default connect(
	state => ({
		filters : state.storageFilters,
        storage : state.storage
	})
)(StorageToolsSettings);


const styleZIndex = {
    zIndex : 2,
};

const styleWarp = {
    ...styleZIndex,
    width: '100%',
    height: 400,
    overflow: 'hidden',
    position: 'absolute'
};

const style ={
	sett : {
		...styleZIndex,
		padding : 10
	},
	settWarp : styleWarp,
	settWarpClose : {
		...styleWarp,
        height: 20,
	}
};

const styleGroupLabel = {
	padding : 15,
	margin : '5px 0px'
};