import {RecordAdd, Storage} from '../../const/Events'

const initialState = {
	data        : [],
	editRow     : -1,
	editRowData : false,
};

const storage = (state = initialState, action) => {

	let editRowData;
	let data;

	// eslint-disable-next-line
	switch (action.type) {
		case Storage.init:
			return {
				...state,
				data : action.data
			};
		case RecordAdd.save:
			return {
				...state,
				data : [action.data].concat(state.data)
			};

		case Storage.move:
			data = [].concat(state.data);
			data.splice(data.findIndex(row => row.id === action.data), 1);

			return {
				...state,
				data: data
			};
		case Storage.modeEdit:
			const id = action.data;

			return {
				...state,
				editRow: id,
				editRowData: Object.assign({}, state.data.find(row => row.id === id))
			};
		case Storage.editClear:
			return {
				...state,
				editRow: -1,
				editRowData: false
			};
		case Storage.saved:
			data = [].concat(state.data);
			data[data.findIndex(row => row.id === state.editRow)] = Object.assign({}, state.editRowData);

			return {
				...state,
				editRowData: false,
				editRow: -1,
				data: data
			};
		case Storage.edit:
			editRowData = Object.assign({}, state.editRowData);
			editRowData[action.data.type] = action.data.val;

			return {
				...state,
				editRowData: editRowData
			};
	}

	return state;
};

export {storage};
