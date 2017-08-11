import React from 'react';
import {connect} from 'react-redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';
import {add} from '../../api/User'
import AlertStatus from '../../const/AlertStatus'
import {Users, Alert} from '../../const/Events'

const UsersTools = (state) => {
	let store = state.store;

	const handelSave = () => {
		const login = store.addName;
		const pass  = store.addPass;

		if (!login || !pass) {
			return state.showAlert(`Enter user ${!login ? 'login' : 'pass'}`, AlertStatus.BAD);
		}

		const data = {
			login : login,
			pass  : pass
		};

		add(data)
			.then(id => {
				state.save({...data,_id : id});
				state.showAlert('User is saved.', AlertStatus.OK);
			})
			.catch(err => state.showAlert(err, AlertStatus.BAD));
	};

	return (
		<Toolbar>
			<ToolbarGroup >
				<ToolbarTitle text="Tools"/>
				<ToolbarSeparator />
				<RaisedButton
					label="Add user"
					primary={true}
					icon={<ActionAdd />}
					onTouchTap={handelSave}
				/>
				<TextField
					hintText={'Enter user'}
					value={store.addName}
					onChange={state.onChangeAddName}
				/>
				<TextField hintText={'Enter password'}
				           value={store.addPass}
				           onChange={state.onChangeAddPass}
				/>
			</ToolbarGroup>
		</Toolbar>
	);
};

export default connect(
	state => ({
		store: state.users
	}),
	dispatch => ({
		onChangeAddName : ev => dispatch({type : Users.createWrite, data : {
			type : 'addName',
			val  : ev.target.value,
		}}),
		onChangeAddPass : ev => dispatch({type : Users.createWrite, data : {
			type : 'addPass',
			val  : ev.target.value,
		}}),
		save : (data) => dispatch({type : Users.create, data : data}),
		showAlert: (mess, type) => dispatch({
			type: Alert.show,
			data: {
				message: mess,
				status: type
			}
		}),
	})
)(UsersTools);
