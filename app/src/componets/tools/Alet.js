import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import SocialMood from 'material-ui/svg-icons/social/mood';
import SocialMoodBad from 'material-ui/svg-icons/social/mood-bad';
import Paper from 'material-ui/Paper'
import AlertStatus from '../../const/AlertStatus'
import {Alert as Event} from '../../const/Events'
import {icoBad,icoOk,paper} from './AlertStyles'

const Alert = (state) => {
	let alert = state.store;

	return (
		<Dialog actions={[<RaisedButton label="Is read" onTouchTap={state.onRead} primary={true}/>]} modal={false} open={alert.open}>
			<Paper style={paper}>
				<table>
					<tbody>
						<tr>
							<td>
							{
								alert.status === AlertStatus.OK
									? <SocialMood    style={icoOk}  />
									: <SocialMoodBad style={icoBad} />
							}
							</td>
							<td>{alert.message}</td>
						</tr>
					</tbody>
				</table>
			</Paper>
		</Dialog>
	);
};

export default connect(
	state => ({store: state.alert}),
	dispatch => ({onRead : () => dispatch({type : Event.close})})
)(Alert);
