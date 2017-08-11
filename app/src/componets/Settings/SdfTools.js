import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import ActionClear from 'material-ui/svg-icons/content/remove-circle';
import ActionLoad from 'material-ui/svg-icons/file/file-download';
import {path, load} from '../../api/Sdf'
import {list} from '../../api/Storage'
import {Sdf, Storage} from '../../const/Events'

const SdfTools = (state) => {
	let store = state.store;

	const add = () => path().then(data => state.addPath(data.folder));
	const loadSdf = () => {

		state.onLoad();

		load(state.data.filePath)
			.then(list)
			.then(data => {
				state.storeInit(data);
				state.onLoadOk();
			})
			.catch(state.onLoadBad);
	};

	return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text='Tools'/>
				<ToolbarSeparator />
				<RaisedButton
					label='Load Sdf'
					secondary={true}
					onTouchTap={loadSdf}
					disabled={!store.buttonLoad}
					icon={<ActionLoad />}
				/>
				<RaisedButton
					label='Clear Sdf'
					primary={true}
					disabled={!store.buttonClear}
					onTouchTap={state.clear}
					icon={<ActionClear />}
				/>
				<RaisedButton
					label='Add Sdf'
					primary={true}
					disabled={!store.buttonAdd}
					onTouchTap={add}
					icon={<ActionAdd />}
				/>

			</ToolbarGroup>
		</Toolbar>
	)
};

export default connect(
	state => ({
		store: state.sdfTools,
		data : state.sdf
	}),
	dispatch => ({
		addPath   : path => dispatch({type : Sdf.add , data : path}),
		onLoad    : ()   => dispatch({type : Sdf.loadRun}),
		onLoadOk  : ()   => dispatch({type : Sdf.loadOk }),
		storeInit : data => dispatch({type : Storage.init , data : data}),
		onLoadBad : data => dispatch({type : Sdf.loadBad, data: data }),
		clear     : ()   => dispatch({type : Sdf.clear})
	})
)(SdfTools);
