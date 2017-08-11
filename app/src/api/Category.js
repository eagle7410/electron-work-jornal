import {save, move, update, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'
const type = Routes.cat;

const add  = name       => reqFull(save, type, name);
const del  = id         => reqFull(move, type, id);
const edit = (id, name) => reqFull(update, type, {id : id, name : name});

export {add, del, edit};
