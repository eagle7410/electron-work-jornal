const send   = require('../libs/send');
const libErr = require('../libs/errors');

let Routes = null;
let modelUsers      = null;
let modelSettings   = null;
let modelStorage    = null;
let modelProjects = null;

module.exports = {
	setModels: (user, storage, settings, projects) => {
		modelUsers      = user;
		modelSettings   = settings;
		modelStorage    = storage;
		modelProjects   = projects;

		return module.exports;
	},
	setRoutes: (routes) => {
		Routes = routes;

		return module.exports;
	},
	config: () => [
		{
			route: Routes.usrList,
			handel: (res, action) => {
				modelUsers.loginList()
					.then(list => send.ok(res, action, list))
					.catch(err => {
						console.log('!ERR get logins', err);
						send.err(res, action, 'Error get logins');
					});
			}
		},
		{
			route: Routes.auth,
			handel: (res, action, data) => {
				modelUsers.auth(data.login, data.pass)
					.then(token => send.ok(res, action, token))
					.catch(err => {

						if (err.type !== libErr.constants.auth) {
							console.log('!ERR auth', err);
						}

						send.err(res, action, 'Error get logins');
					});
			}
		},
		{
			route: Routes.appInit,
			handel: (res, action) => {
				let data = {};

				modelUsers.list()
					.then(list => {
						data.users = list;
						return modelProjects.list();
					})
					.then(list => {
						data.projects = list;
						return modelStorage.list();
					})
					.then(list => {
						data.storage = list;
						return modelSettings.list();
					})
					.then(list => {
						let settings = {};

						list.map(sett => {
							switch (sett.type) {
								case modelSettings.typeDBox:
									settings[modelSettings.typeDBox] = {
										apiData: sett.apiData,
										accessToken: Boolean(sett.accessToken),
										token : sett.accessToken
									}
							}
						});

						data.settings = settings;

						send.ok(res, action, data);
					})
					.catch(err => {
						console.log(`!ERR ${Routes.appInit}`, err);
						send.err(res, action, `Error get ${Routes.appInit}`);
					});
			}
		}
	]
};
