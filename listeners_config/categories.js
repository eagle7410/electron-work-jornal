const send     = require('../libs/send');
const libErr   = require('../libs/errors');

const reqTypes = send.reqTypes;
let model  = null;
let Routes = null;

module.exports = {
	setModel: (dbModel) => {
		model = dbModel;
		return module.exports;
	},
	setRoutes: (routes) => {
		Routes = routes;

		return module.exports;
	},
	config: () => {
		let config = [
			{
				type   : reqTypes.put,
				handel : (res, action, data) => {
					model.updateSafe(data.id, data.name)
						.then(() => send.ok(res, action))
						.catch(err => {
							switch (err.type) {
								case libErr.constants.valid :
									send.err(res, action, err.mess);
									break;
								default :
									console.log('!ERR update ' + main , err);
									send.err(res, action, 'No update ' + main);
							}
						});
				}
			},
			{
				type   : reqTypes.del,
				handel : (res, action, id) => {
					model.delete(id)
						.then(() => send.ok(res, action))
						.catch(err => {
							console.log('!ERR delete category', err);
							send.err(res, action);
						});
				}
			},
			{
				type   : reqTypes.post,
				handel : (res, action, name) => {
					model.save(name)
						.then(cat => send.ok(res, action, cat))
						.catch(err => {
							switch (err.type) {
								case libErr.constants.valid :
									send.err(res, action, err.mess);
									break;
								default :
									console.log('!ERR save category', err);
									send.err(res, action, 'Server error no save.');
							}
						});
				}
			}
		];
		const main = Routes.cat;
		return config.map(conf => {
			conf.route = conf.route || main;
			return conf;
		})
	}
};
