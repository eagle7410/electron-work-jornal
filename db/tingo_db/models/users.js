const async = require('async');
let model   = null;
let libErr  = require('../../../libs/errors');

/**
 * Init model.
 * @param {object} db.
 */
module.exports.init = db => {
	model = db.collection('users');
	module.exports.model = model;
};

module.exports.model = null;

/**
 * Get login list.
 *
 * @return {{Promise}}
 */
module.exports.loginList = () => new Promise((ok, bad) => {
	model.find({}, {fields: {login: 1}}, (err, cur) => {
		if (err) {
			return bad(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			let arList = [];
			list.map(rec => arList.push(rec.login));

			ok(arList);
		})
	});
});

/**
 * Authorization users.
 * @param {string} login
 * @param {string} pass
 *
 * @return {{Promise}}
 */
module.exports.auth = (login, pass) => new Promise((ok, bad) => {
	model.findOne({login: login}, (err, user) => {
		if (err) {
			return bad(err);
		}

		if (user.pass === hash(pass)) {
			ok(hash(`${login}token`));
		}

		bad(libErr.auth());

	})
});

/**
 *  Get users
 *
 *  @return {{Promise}}
 */
module.exports.list = () => new Promise((ok, bad) => {
	model.find({}, (err, cur) => {
		if (err) {
			return bad(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			let objList = [];
			list.map(user => {
				let newUser = Object.assign({}, user);
				newUser._id = Number(user._id);
				objList.push(newUser);
			});

			ok(objList);
		})
	});
});

/**
 * Validate data.
 *
 * @param {object} data
 * @param {string} action
 *
 * @return {{Promise}}
 */
const isValid = (data, action = 'create') => new Promise((ok, bad) => {
	if (!data.login) {
		return bad(libErr.valid('Login empty'));
	}

	if (!data.pass && action === 'create') {
		return bad(libErr.valid('Pass empty'));
	}

	model.count({login: data.login}, (err, count) => {
		if (err) {
			return bad(err);
		}

		if (count === 0) {
			return ok();
		}

		bad(libErr.valid('User no unique'));
	});
});

/**
 * Create password hash.
 *
 * @param {string} pass
 * @param {string} secret
 *
 * @return string
 */
const hash = (pass, secret = 'IgorStcherbina') => {
	const crypto = require('crypto');

	return crypto.createHmac('sha256', secret)
		.update(pass)
		.digest('hex');
};

/**
 * Create new user.
 * @param {object} data
 *
 * @return {{Promise}}
 */
module.exports.save = data => new Promise((ok, bad) => {
	isValid(data)
		.then(() => {
			data.pass = hash(data.pass);

			model.insert(data, (err, data) => {
				if (err) {
					return bad(err);
				}

				ok(Number(data[0]._id));
			})
		}, bad);
});

/**
 * Delete user.
 *
 * @param {number} id
 *
 * @return {{Promise}}
 */
module.exports.delete = id => new Promise((ok, bad) => {
	model.remove({_id: id}, err => err ? bad(err) : ok());
});

/**
 * Update user with validation.
 *
 * @param {object} data
 *
 * @return {{Promise}}
 */
module.exports.updateSafe = (data) => new Promise((ok, bad) => {
	isValid(data, 'update')
		.then(() => {
			model.update({_id: data.id}, {login: data.login}, err => {
				if (err) {
					return bad(err);
				}

				ok();
			})
		}, bad);
});

/**
 * Add many users.
 *
 * @param {[{object}]}data
 *
 * @return {{Promise}}
 */
module.exports.addMany = data => new Promise((ok, bad) => {
	//noinspection JSUnresolvedFunction
	async.forEach(data, (rec, next) => {
		model.findOne({_id: rec._id}, (err, doc) => {
			if (err) {
				return next(err);
			}

			if (!doc) {
				return model.insert(rec, e => next(e));
			}

			if (rec._id) {
				delete rec._id;
			}

			model.update({_id: doc._id}, {
				login: rec.login,
				pass: doc.pass
			}, next);
		});
	}, err => err ? bad(err) : ok());
});
