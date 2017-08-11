const libErr = require('../libs/errors');
const send   = require('../libs/send');
const sdf    = require('../libs/sdf');

const reqTypes   = send.reqTypes;
let Routes = null;
let mainWindow   = null;
let modelStorage = null;
let dialog = null;

module.exports = {
	setWindow: win => {
		mainWindow = win;
		return module.exports;
	},
	setModelStorage: model => {
		modelStorage = model;
		return module.exports;
	},
	setDialog: dialogComponent => {
		dialog = dialogComponent;
		return module.exports;
	},
	setRoutes: (routes) => {
		Routes = routes;

		return module.exports;
	},
	config   : () => [
		{
			route  : Routes.sdfPath,
			handel : (res, action) => {
				let folder = dialog.showOpenDialog(mainWindow, {
					filters : [
						{name: 'Sdf Files', extensions: ['sdf']},
						{name: 'All Files', extensions: ['*']}
					],
					defaultPath : '/home/igor/desk',
					properties: ['openFile']}
				);
				send.ok(res, action, {folder : Array.isArray(folder) ? folder.shift() : ''});
			}
		},
		{
			type   : reqTypes.post,
			route  : Routes.sdfLoad,
			handel : (res, action, data) => {
				sdf.content(data)
					.then(modelStorage.addMany)
					.then(() => send.ok(res, action, null))
					.catch(err => {
						let mess = 'Sorry inner error';

						if (err.type !== libErr.constants.sdf) {
							console.log(`!ERR ${Routes.sdfLoad}`, err);
						} else {
							mess = err.mess;
						}

						send.err(res, action, mess);
					});
			}
		}
	]
};
