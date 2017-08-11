import {RecordAdd} from '../../const/Events'

const initialState = {
	category      : false,
	title         : '',
	login         : '',
	pass          : '',
	desc          : '',
	answer        : '',
	errorCategory : ''
};

const recordAdd = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case RecordAdd.init:
			return {...initialState};

		case RecordAdd.errCat:
			return {
				...state,
				errorCategory : action.data
			};
		case RecordAdd.saved:
			return {
				...state,
				errorCategory : ''
			};

		case RecordAdd.change:
			let newState = Object.assign({}, state);
			newState[action.data.type] = action.data.val;
			return {
				...state,
				...newState
			};
	}

	return state;
};

export {recordAdd};
