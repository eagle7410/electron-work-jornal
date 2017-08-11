import {get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const fullData = () => new Promise((ok, bad) => get(Routes.appInit).then(r => ok(r.data), bad));

export {fullData};
