import {DropBoxForm, StepsConnect} from '../../const/Events'
const initialState = {
	init        : false,
	apiKey      : '',
	apiSecret   : '',
	confirmLink : '',
	accessToken : false,
	oauth_token : '',
	oauth_token_secret : '',
	uid : '',
};

const dropBoxSettingsForm = (state = initialState, action) => {
	let newState;

	// eslint-disable-next-line
	switch (action.type) {
		case DropBoxForm.reconnect:
			return {
				...state,
				...initialState
			};
		case DropBoxForm.connectInit:
			return {
				...state,
				init: true
			};

		case DropBoxForm.setToken:
			return {
				...state,
				accessToken : true
			};

		case StepsConnect.init:

			newState = {};

			//noinspection JSUnresolvedVariable
			if (action.data.dropBox) {

				//noinspection JSUnresolvedVariable
				let dropBox = action.data.dropBox;

				newState = {
					apiKey: dropBox.apiData.apiKey,
					apiSecret: dropBox.apiData.apiSecret,
					accessToken: dropBox.accessToken,
					...dropBox.token
				}
			}

			return {
				...state,
				...newState
			};

		case DropBoxForm.apiEnter:
			newState = {...state};
			newState[action.data.type] = action.data.val;

			return newState;

		case StepsConnect.linkConfirm:
			return {
				...state,
				confirmLink: action.data
			};

		case StepsConnect.haveAccess :
			return {
				...state,
				accessToken: true,
				init: true
			};
	}

	return state;
};

export {dropBoxSettingsForm};
