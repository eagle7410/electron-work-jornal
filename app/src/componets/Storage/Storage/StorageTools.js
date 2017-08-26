import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import {StorageFilters, Storage} from '../../../const/Events'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ExtStyle from './StorageTools.css';
import Paper from 'material-ui/Paper';
import StorageToolsSettings from './StorageToolsSettings'
import FilterDateMode from '../../../const/FilterDateMode'

const stylePanagation = {maxWidth: '30px'};
class StoreTools extends Component {
    constructor (props) {
        super(props);

        let that = this;
        let filters = that.props.filters;

        that.changeFilter(filters.projectSelect, filters.filterDate);
    }

    changeCountInPage (ev, val) {
        val = Number(val);

        if (isNaN(val) || val === 0) {
            return;
        }

        this.props.state.changeCountInPage(val);
	}

    changeFilter (project, date, mode, projectAll) {
        let filters = this.props.filters;

        mode = mode || filters.filterDateMode;

        if (typeof projectAll !== 'boolean' )
    		projectAll = filters.projectAll;

        let store = this.props.storage;
        let hours = 0;
        let hoursFact = 0;
        let rows = store.data.filter(row => {

            if (mode !== FilterDateMode.noUse) {
                if (mode === FilterDateMode.useDate && row.date_doit.substr(0, 10) !== date) {
                    return false;
                }
            }

            if (!projectAll && row.project !== project) {
                return false;
            }

            hours += Number(row.hours) || 0;
            hoursFact += Number(row.hours_fact) || 0;

            return true;
        });

        this.props.changeFiltes({
            rows : rows,
            hoursInDate       : hours,
            hoursFactInDate   : hoursFact,
            filterDate        : date,
            projectSelect    : project,
            projectAll : projectAll,
            filterDateMode  : mode
        });
	}

	render () {
    	let state = this.props;
        let filters = this.props.filters;

    	return (
			<div >
				<Paper zDepth={2} style={{display: 'flex', width: '100%'}}>
					<Toolbar style={{zIndex: 4, width: '100%'}}>
						<ToolbarGroup >
							<FloatingActionButton
								className={filters.extToolsOpen ? 'tools-open' : ''}
								style={ExtStyle.tools}
								secondary={true}
								mini={true}
								onClick={state.toggleShowExtTools}
							>
								<ContentAdd />
							</FloatingActionButton>
							<ToolbarSeparator />
							<ToolbarTitle text='Tools' />

							<ToolbarSeparator />

							hours: {filters.hoursInDate}&nbsp;hoursFact: {filters.hoursFactInDate}
							<ToolbarSeparator />
							&nbsp;Count in page&nbsp;
							<TextField style={stylePanagation} onChange={this.changeCountInPage.bind(this)} value={state.pagination.split} id='inputPagi' hintText='Enter count record in page' />
						</ToolbarGroup>
					</Toolbar>
				</Paper >
				<StorageToolsSettings onChange={this.changeFilter.bind(this)}/>
			</div>
        );
	}
}

export default connect(
	state => ({
		filters : state.storageFilters,
		pagination : state.storagePagination,
		storage : state.storage
	}),
	dispatch => ({
		changeFiltes      : data => dispatch({type : StorageFilters.chFilter, data : data}),
		changeCountInPage : val => dispatch({type : Storage.changeCountInPage, data : val}),
		toggleShowExtTools   : () => dispatch({type: StorageFilters.tgShowExteds}),
	})
)(StoreTools);
