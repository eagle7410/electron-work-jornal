import React from 'react';
import {connect} from 'react-redux';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {StepsDownload as Events,Alert, StorageProjects, Users, Storage} from '../../../const/Events'
import {DropBox} from '../../../const/Messages'
import AlertStatus from '../../../const/AlertStatus'
import {styleBlock, styleButtonBlock} from '../../../const/Styles'
import {getArchive, extractArchive, mergeArchive, clearArchive} from '../../../api/DropBox'
import {fullData} from '../../../api/Loader'
import StepsSimpleContent from './StepsSimpleContent'


const StepsDownload = (state) => {
	const store    = state.store;
	const connect  = state.connect ;
	const finished  = store.finished;
	const stepIndex = store.stepIndex;
	const loading   = store.loading;

	const handelRun = () => {
		state.run();

		getArchive()
			.then(date => {
				state.next();
				return extractArchive(date);
			})
			.then(date => {
				state.next();
				return mergeArchive(date);
			})
			.then(date => {
				state.next();
				return clearArchive(date);
			})
			.then(fullData)
			.then(res => new Promise(ok => {
				['Projects', 'Users', 'Storage'].forEach(
					p => state[`init${p}`](res[p.toLowerCase()])
				);
				state.next();
				ok();
			}))
			.then(() => {
				state.next();
			})
			.catch(err => {
				//TODO IGOR: clear
				console.log('err', err);
				state.stop();
				state.showAlert(DropBox.badTryUpload, AlertStatus.BAD);
			});
	};

	const actionDisable = !connect.init || loading;

	return (
		<div style={styleBlock}>
			<div style={styleButtonBlock}>
				<RaisedButton
					label={'Run'}
					disabled={actionDisable}
					primary={true}
					onTouchTap={handelRun}
				/>
				<RaisedButton
					label={'Restart'}
					disabled={!finished}
					secondary={true}
					onTouchTap={state.reset}
				/>
				<StepsSimpleContent finished={finished} loading={loading} stop={store.stop}/>
			</div>
			<Stepper activeStep={stepIndex}>
				<Step><StepLabel>Download from DropBox</StepLabel></Step>
				<Step><StepLabel>Extract archive</StepLabel></Step>
				<Step><StepLabel>Merge data</StepLabel></Step>
				<Step><StepLabel>Clear</StepLabel></Step>
				<Step><StepLabel>Update App</StepLabel></Step>
			</Stepper>
		</div>
	);
};

export default connect(
	state => ({
		store: state.dropBoxStepsDownload,
		connect : state.dropBoxSettingsForm
	}),
	dispatch => ({
		run       : () => dispatch({type : Events.run}),
		stop      : () => dispatch({type : Events.stop}),
		next      : () => dispatch({type : Events.next}),
		reset     : () => dispatch({type : Events.reset}),
		initUsers      : data  => dispatch({type: Users.init , data: data}),
		initStorage    : data  => dispatch({type: Storage.init , data: data}),
		initProjects   : data  => dispatch({type: StorageProjects.init , data: data}),
		showAlert : (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(StepsDownload);
