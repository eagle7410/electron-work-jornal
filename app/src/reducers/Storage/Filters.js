import {StorageFilters} from '../../const/Events'

const initialState = {
	categorySelect    : 2,
	categoryAll       : 2,
	searchText        : '',
	showSearchText    : false,
	searchIcoActive   : '#F44336',
	searchIcoInactive : '#FFA726',
	searchIcoNow      : '#FFA726',
};

const storageFilters = (state = initialState, action) => {

	// eslint-disable-next-line
	switch (action.type) {
		case StorageFilters.chCat:
			return {
				...state,
				categorySelect: action.data
			};
		case StorageFilters.chText:
			return {
				...state,
				searchText: action.data
			};
		case StorageFilters.toggleText:
			let show = !state.showSearchText;
			let text = '';

			if (show) {
				text = state.searchText;
			}

			return {
				...state,
				showSearchText : show,
				searchText     : text,
				searchIcoNow   : show ? state.searchIcoActive : state.searchIcoInactive
			};
	}

	return state;
};

export {storageFilters};
