import {StepsConnect} from '../../const/Events'

const initialState = {
	loading   : false,
	finished  : false,
	stepIndex : 0
};

const dropBoxConnectSteps = (state = initialState, action) => {
	let next;

	// eslint-disable-next-line
	switch (action.type) {
		
		case StepsConnect.nextRun:
			return {
				...state,
				loading : true
			};

		case StepsConnect.nextStop:
			return {
				...state,
				loading : false
			};

		case StepsConnect.next:
		case StepsConnect.linkConfirm:
		case StepsConnect.haveAccess:
			next = state.stepIndex + 1;
			return {
				...state,
				loading   : false,
				finished  : next >= 2,
				stepIndex : next
			};

		case StepsConnect.stepFirst:
			return {
				...state,
				finished  : false,
				stepIndex : 0
			};

	}

	return state;
};

export {dropBoxConnectSteps};
