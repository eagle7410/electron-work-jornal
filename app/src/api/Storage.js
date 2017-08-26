import {get, update, save , move, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'
import {DateToString} from '../utils/Date'

const formatData = data => {
    data.date_doit = DateToString(data.date_doit);

	return data;
};
const type = Routes.store;
const list       = ()   => reqFull(get   , type);
const edit       = data => reqFull(update, type, formatData(data));
const del        = id   => reqFull(move  , type, id);
const addRecord  = data => reqFull(save  , type, formatData(data));

export {addRecord, edit, del, list};
