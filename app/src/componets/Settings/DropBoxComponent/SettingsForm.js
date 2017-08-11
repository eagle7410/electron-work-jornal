import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import StepsConnect from './StepsConnect'
import {DropBoxForm, Alert, StepsConnect as EventStep} from '../../../const/Events'
import {getConnect, setToken} from '../../../api/DropBox'
import AlertStatus from '../../../const/AlertStatus'
import {DropBox, Alert as AlertMessage} from '../../../const/Messages'
import {styleBlock, styleDiv, styleBlockInCell} from '../../../const/Styles'
import ActionSave from 'material-ui/svg-icons/content/save';

const SettingsForm = (state) => {
	let store = state.store;
	let action;
	const InitConnect = () => {
		getConnect()
			.then(
				() => state.connectInit(),
				err => state.showAlert(DropBox.badConnect, AlertStatus.BAD),
			)
	};

	const Reconnect = () => {
		state.reconnect();
		state.firstStep();
	};

	const saveToken = () => {
		let {oauth_token, oauth_token_secret, uid, apiKey, apiSecret } = store;

		if (!oauth_token || !oauth_token_secret || !uid || !apiKey || !apiSecret) {
			return state.showAlert('You enter, not full token', AlertStatus.BAD);
		}

		let data = {
			oauth_token_secret : oauth_token_secret,
			oauth_token : oauth_token,
			uid : uid,
			apiKey : apiKey,
			apiSecret : apiSecret
		};

		setToken(data)
			.then(() => state.setTokenOk())
			.catch(() => state.showAlert(AlertMessage.errorInner, AlertStatus.BAD));
	};

	if (store.accessToken) {
		action = (<div style={styleBlock}>
			<RaisedButton
				label={'Init'}
				primary={true}
				disabled={store.init}
				onTouchTap={InitConnect}
			/>
			<RaisedButton
				label={'Reconnect'}
				secondary={true}
				onTouchTap={Reconnect}
			/>
			</div>)
	} else {
		action = <StepsConnect />;
	}

	return (
		<div style={{padding : '5px'}}>
			<div style={styleBlock}>
				<h3>Connect to DropBox</h3>
				<div style={styleBlockInCell}>
					<TextField id={'apiKey'}
						disabled={store.accessToken}
						onChange={ev => state.handelEnterApiData('apiKey', ev.target.value)}
						value={store.apiKey}
						floatingLabelText={'api key'}
						hintText={'Enter api key'}
					/>
					<TextField id={'apiSecret'}
						style={styleDiv}
						disabled={store.accessToken}
						onChange={ev => state.handelEnterApiData('apiSecret', ev.target.value)}
						value={store.apiSecret}
						floatingLabelText={'api secret'}
						hintText={'Enter api secret'}
					/>
				</div>

			</div>
			{action}
			<div style={styleBlock}>
				<TextField id={'oauth_token'}
				           disabled={store.accessToken}
				           onChange={ev => state.handelEnterApiData('oauth_token', ev.target.value)}
				           value={store.oauth_token}
				           floatingLabelText={'oauth_token'}
				           hintText={'Enter oauth_token'}
				/>
				<TextField id={'oauth_token_secret'}
				           style={styleDiv}
				           disabled={store.accessToken}
				           onChange={ev => state.handelEnterApiData('oauth_token_secret', ev.target.value)}
				           value={store.oauth_token_secret}
				           floatingLabelText={'oauth_token_secret'}
				           hintText={'Enter oauth_token_secret'}
				/>
				<TextField id={'uid'}
				           style={styleDiv}
				           disabled={store.accessToken}
				           onChange={ev => state.handelEnterApiData('uid', ev.target.value)}
				           value={store.uid}
				           floatingLabelText={'uid'}
				           hintText={'Enter uid'}
				/>
				<RaisedButton
					label={'Save'}
					primary={true}
					disabled={store.accessToken}
					icon={<ActionSave />}
					onTouchTap={saveToken}
				/>
			</div>
		</div>

	);
};

export default connect(
	state => ({
		store   : state.dropBoxSettingsForm,
		connect : state.dropBoxConnectSteps
	}),
	dispatch => ({
		setTokenOk  : () => dispatch({type : DropBoxForm.setToken}),
		firstStep   : () => dispatch({type : EventStep.stepFirst}),
		reconnect   : () => dispatch({type : DropBoxForm.reconnect}),
		connectInit : () => dispatch({type : DropBoxForm.connectInit}),
		showAlert   : (mess, type) => dispatch({
			type: Alert.show,
			data: {
				message: mess,
				status: type
			}
		}),
		handelEnterApiData : (type, val) => dispatch({
			type : DropBoxForm.apiEnter,
			data : {
				type : type,
				val  : val
			}
		}),
	})
)(SettingsForm);
