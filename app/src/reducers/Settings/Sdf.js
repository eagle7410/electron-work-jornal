import {Sdf} from '../../const/Events';
const initialState = {
	filePath   : '',
	isLoad     : false,
	isLoadOk   : false,
	isTryLoad  : false,
	errorMeess : ''
};

const sdf = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case Sdf.loadBad:
			return {
				...state,
				isLoad : false,
				isLoadOk : false,
				errorMess: action.data
			};
		case Sdf.loadOk:
			return {
				...state,
				isLoad    : false,
				isLoadOk  : true,
			};
		case Sdf.loadRun:
			return {
				...state,
				isTryLoad : true,
				isLoad: true
			};
		case Sdf.add :
			return {
				...state,
				filePath: action.data
			};
		case Sdf.clear :
			return {
				...initialState
			};
	}

	return state;
};

export {sdf};
