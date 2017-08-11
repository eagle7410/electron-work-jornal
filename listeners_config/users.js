const send   = require('../libs/send');
const libErr = require('../libs/errors');

const reqTypes = send.reqTypes;
let model = null;
let Routes = null;

module.exports = {
	setModel : (dbModel) => {
		model = dbModel;
		return module.exports
	},
	setRoutes: (routes) => {
		Routes = routes;

		return module.exports;
	},
	config   : () => {
		let config = [
			{
				type   : reqTypes.post,
				handel : (res, action, data) => {
					model.save(data)
						.then(data => send.ok(res, action, data))
						.catch(err => {
							switch (err.type) {
								case libErr.constants.valid :
									send.err(res, action, err.mess);
									break;
								default :
									console.log(`!ERR save ${main}`, err);
									send.err(res, action, 'Server error no save.');
							}
						});
				}
			},
			{
				type   : reqTypes.put,
				handel : (res, action, data) => {
					model.updateSafe(data)
						.then(() => {
							send.ok(res, action, null);
						})
						.catch(err => {
							switch (err.type) {
								case libErr.constants.valid :
									send.err(res, action, err.mess);
									break;
								default :
									console.log(`!ERR update ${main}`, err);
									send.err(res, action, `No update ${main}.`);
							}
						});
				}
			},
			{
				type   : reqTypes.del,
				handel : (res, action, id) => {
					model.delete(id)
						.then(() => send.ok(res, action, null))
						.catch(err => {
							console.log(`!ERR delete ${main}`, err);
							send.err(res, action, null);
						});
				}
			},
		];

		return config.map(conf => {
			conf.route = conf.route|| Routes.usr;
			return conf;
		});
	}

};
