import {get, update, save , move, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'

const type = Routes.store;
const list       = ()   => reqFull(get   , type);
const edit       = data => reqFull(update, type, data);
const del        = id   => reqFull(move  , type, id);
const addRecord  = data => reqFull(save  , type, data);

export {addRecord, edit, del, list};
