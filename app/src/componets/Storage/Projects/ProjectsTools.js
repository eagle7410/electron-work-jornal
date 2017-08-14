import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {add} from '../../../api/Category';
import AlertStatus from '../../../const/AlertStatus'
import {Alert} from '../../../const/Messages'
import {StorageProjects, Alert as AlertAction} from '../../../const/Events'

const ProjectsTools = (state) => {
	let store = state.store;

	const handelSave = () => {
		const val = store.addName;

		if (!val) {
			return state.showAlert(Alert.empty, AlertStatus.BAD);
		}

		add(val)
			.then(data => {
				state.save(data);
				state.showAlert(Alert.save, AlertStatus.OK);
			})
			.catch(err => state.showAlert(err, AlertStatus.BAD));
	};

	return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text='Tools'/>
				<ToolbarSeparator />
				<RaisedButton
					label='Add project'
					primary={true}
					icon={<ActionAdd />}
					onTouchTap={handelSave}
				/>
				<TextField
					hintText={'Enter project'}
					value={store.addName}
					onChange={state.onChangeAddName}
				/>

			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		store: state.storageProjects
	}),
	dispatch => ({
		onChangeAddName : ev => dispatch({type : StorageProjects.createMode, data : ev.target.value}),
		save : data => dispatch({type : StorageProjects.create, data : data}),
		showAlert : (mess, type) => dispatch({
			type : AlertAction.show ,
			data : {
				message : mess,
				status  : type
			}
		})
	})
)(ProjectsTools);
