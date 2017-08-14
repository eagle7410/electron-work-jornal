const electron    = require('electron');
const ipcRenderer = electron.ipcMain;
const dialog      = electron.dialog;
// Db
const dbFolder = 'db';
//Paths
const pathManager   = require('./libs/path-manager');
pathManager.setDbFolder(dbFolder);
const Engine   = require('tingodb')();
const dbPath   = pathManager.getPathDb();
const db       = new Engine.Db(dbPath, {});
const models   = require('./db/tingo_db/models');

// Messages
const listenSdf        = require('./listeners_config/sdf');
const listenAuth       = require('./listeners_config/auth');
const listenUsers      = require('./listeners_config/users');
const listenCould      = require('./listeners_config/drop-box');
const listenStorage    = require('./listeners_config/storage');
const listenProjects   = require('./listeners_config/projects');
const send             = require('./libs/send');
const Routes = require('./routes/RoutesConst');

const listen = (action, handel) => {
	ipcRenderer.on(action, (event, arg) => handel(event.sender, `${action}-response`, arg));
};

const listeners = arConfig => {
	arConfig.map(group => group.setRoutes(Routes).config().map(conf => {
		const type = conf.type || send.reqTypes.get;
		listen(`${type.toLowerCase()}->${conf.route}`, conf.handel);
	}));
};

// Models
const modelConstant   = require('./modelConst');
const modelUsers      = models.get(db, modelConstant.usr);
const modelSettings   = models.get(db, modelConstant.sett);
const modelStorage    = models.get(db, modelConstant.store);
const modelProjects   = models.get(db, modelConstant.prj);

module.exports = {
	run: (mainWindow) => new Promise(ok => {
		listeners([
			listenCould.setModels(modelUsers, modelStorage, modelSettings, modelCategories),
			listenStorage.setModel(modelStorage),
			listenSdf.setDialog(dialog).setWindow(mainWindow).setModelStorage(modelStorage),
			listenAuth.setModels(modelUsers, modelStorage, modelSettings, modelCategories),
			listenCategories.setModel(modelCategories),
			listenUsers.setModel(modelUsers)
		]);
		ok();
	})
};
