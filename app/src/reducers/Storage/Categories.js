import {StorageCategory} from '../../const/Events'
const initialState = {
	list     : {},
	noChoice : [2],
	onEdit   : false,
	editName : '',
	addName  : ''
};

const storageCategories = (state = initialState, action) => {
	let list;

	// eslint-disable-next-line
	switch (action.type) {
		case StorageCategory.init:
			return {
				...state,
				list : action.data
			};
		case StorageCategory.createMode:
			return {
				...state,
				addName : action.data
			};
		case StorageCategory.create:
			list = Object.assign({}, state.list);
			list[action.data.id] = action.data.name;

			return {
				...state,
				list : list,
				addName : ''
			};
		case StorageCategory.edit:
			return {
				...state,
				editName : action.data
			};
		case StorageCategory.editSave:
			list = Object.assign({}, state.list);
			list[String(state.onEdit)] = state.editName;
			return {
				...state,
				list: list,
				onEdit: false,
				editName: ''
			};
		case StorageCategory.editMode:
			return {
				...state,
				onEdit: action.data,
				editName : state.list[String(action.data)]
			};
		case StorageCategory.editCancel:
			return {
				...state,
				onEdit: false,
				editName: ''
			};
		case StorageCategory.move:
			list = Object.assign({}, state.list);
			delete list[action.data];
			return {
				...state,
				list : list
			};

	}

	return state;
};

export {storageCategories};

