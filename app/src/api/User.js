import {save, move, update, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'

const type = Routes.usr;
const add  = data => reqFull(save, type, data);
const edit = data => reqFull(update, type, data);
const del  = id   => reqFull(move, type, id);

export {add, edit, del};
