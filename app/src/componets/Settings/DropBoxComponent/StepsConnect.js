import React from 'react';
import {connect} from 'react-redux';
import { Step, Stepper, StepLabel} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import {StepsConnect as Events, Alert} from '../../../const/Events'
import {DropBox} from '../../../const/Messages'
import {styleContent, styleButtonBlock, styleBlock} from '../../../const/Styles'
import AlertStatus from '../../../const/AlertStatus'
import {getLink, getAccess} from '../../../api/DropBox'

const StepsConnect = (state) => {
	const store     = state.store;
	const form      = state.form;
	const stepIndex = store.stepIndex;
	const loading   = store.loading;

	const handleNext = () => {
		state.nextRun();

		switch (stepIndex + 1) {
			case 1 :
				if (form.apiKey && form.apiSecret) {
					return getLink({
							apiKey    : form.apiKey,
							apiSecret : form.apiSecret
						})
						.then(link => state.setLink(link))
						.catch(() => {
							state.nextStop();
							state.showAlert(DropBox.apiDataBad, AlertStatus.BAD)
						});
				}

				state.nextStop();
				state.showAlert(DropBox.apiEmpty, AlertStatus.BAD);
				break;

			case 2 :
				return getAccess()
					.then(() => state.setAccess())
					.catch(() => {
						state.nextStop();
						state.showAlert(DropBox.apiNoAccess, AlertStatus.BAD)
					});

			default :
				state.nextStop();
		}
	};

	const getStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return (<p>Enter api data.</p>);
			case 1:
				return (<p>Go to {form.confirmLink} and confirm connect. </p>);
			default:
				return 'You\'re a long way from home sonny jim!';
		}
	};

	const renderContent = () => (
		<div style={styleContent}>
			<div>{getStepContent(stepIndex)}</div>
			<div style={styleButtonBlock}>
				<RaisedButton
				  label={stepIndex === 1 ? 'Finish' : 'Next'}
				  primary={true}
				  onTouchTap={handleNext}
				/>
			</div>
		</div>
	);

	return (
		<div style={styleBlock}>
			<Stepper activeStep={stepIndex}>
				<Step><StepLabel>Enter config</StepLabel></Step>
				<Step><StepLabel>Confirm link</StepLabel></Step>
			</Stepper>
			<ExpandTransition loading={loading} open={true}>
				{renderContent()}
			</ExpandTransition>
		</div>
	);
};

export default connect(
	state => ({
		store: state.dropBoxConnectSteps,
		form : state.dropBoxSettingsForm
	}),
	dispatch => ({
		nextRun   : ()   => dispatch({type : Events.nextRun}),
		nextStop  : ()   => dispatch({type : Events.nextStop}),
		next      : ()   => dispatch({type : Events.next}),
		setLink   : link => dispatch({type : Events.linkConfirm, data: link}),
		setAccess : ()   => dispatch({type : Events.haveAccess}),
		showAlert : (mess, type) => dispatch({
			type : Alert.show,
			data : {
				message: mess,
				status: type
			}
		})
	})
)(StepsConnect);
