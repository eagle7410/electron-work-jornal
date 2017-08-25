import {get, update, save , move, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'

const formatData = data => {

	if (typeof data.date_doit === 'object') {
		let d = data.date_doit;
		let m = d.getMonth() + 1;
		let day = d.getDate();


		if (m < 10) {
			m = '0' + m;
		}

		if (day < 10) {
			day = '0' + day;
		}

		data.date_doit = d.getFullYear()+'-'+m +'-' +day;

	}

	return data;
};
const type = Routes.store;
const list       = ()   => reqFull(get   , type);
const edit       = data => reqFull(update, type, formatData(data));
const del        = id   => reqFull(move  , type, id);
const addRecord  = data => reqFull(save  , type, formatData(data));

export {addRecord, edit, del, list};
