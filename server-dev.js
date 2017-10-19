const electron    = require('electron');
const ipcRenderer = electron.ipcMain;
const dialog      = electron.dialog;

// Db
const dbFolder      = 'db_test';
const Engine        = require('tingodb')();
const dbPath        = `${__dirname}/${dbFolder}/tingo_db/data`;
const db            = new Engine.Db(dbPath, {});
const Routes        = require('./routes/RoutesConstDev');
const modelsFactory = require('./db/tingo_db/models');

// Paths
const pathManager   = require('./libs/path-manager');
pathManager.setDbFolder(dbFolder);

// Request listeners.
const listenAuth       = require('./listeners_config/auth');
const listenUsers      = require('./listeners_config/users');
const listenCould      = require('./listeners_config/coulds');
const listenStorage    = require('./listeners_config/storage');
const listenProjects   = require('./listeners_config/projects');
const send             = require('./libs/send');


// Clouds
const cloudFactory = require('./libs/clouds/CloudFactory');
const clouds = {
	google : cloudFactory.getCloud(cloudFactory.types().google),
	dbox : cloudFactory.getCloud(cloudFactory.types().dBox)
};

const listen = (action, handel) => {
	ipcRenderer.on(action, (event, arg) => {
		console.log(`:: ${action} `, arg);
		handel(event.sender, `${action}-response`, arg);
	});
};

const listeners = arConfig => {
	arConfig.map(group => group.setRoutes(Routes).config().map(conf => {
		const type = conf.type || send.reqTypes.get;
		listen(`${type.toLowerCase()}->${conf.route}`, conf.handel);
	}));
};

// Models
const modelConstant   = require('./constModels');
const models = {
	users    : modelsFactory.get(db, modelConstant.usr),
	setting  : modelsFactory.get(db, modelConstant.sett),
	store    : modelsFactory.get(db, modelConstant.store),
	projects : modelsFactory.get(db, modelConstant.prj)
};

module.exports = {
	run: (mainWindow) => new Promise(ok => {

		listeners([
			listenCould.setDialog(dialog).setWindow(mainWindow).setModels(models).setClouds(clouds),
			listenAuth.setModels(models).setClouds(clouds),
			listenStorage.setModel(models.store),
			listenProjects.setModel(models.projects),
			listenUsers.setModel(models.users)
		]);
		ok();
	})
};
