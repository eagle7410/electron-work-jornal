import {save, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const path = data => reqFull(get, Routes.sdfPath, data);
const load = data => reqFull(save, Routes.sdfLoad, data, null, (e, bad) => bad(e));

export {path, load};

