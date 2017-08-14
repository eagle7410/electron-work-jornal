const async = require('async');
const libErr = require('../../../libs/errors');
let model   = null;

/**
 * Init model.
 * @param {object} db
 */
module.exports.init = db => {
	model = db.collection('storage');
	module.exports.model = model;
};

module.exports.model = null;

/**
 * Validate record.
 *
 * @param {object} data
 * @param {String} action
 *
 * @return {{Promise}}
 */
const isValid = (data, action = 'create') => new Promise((ok, bad) => {

	if (!data.task && !data.date_doit) {
		return bad(libErr.valid('Record must have task And date_doit'));
	}

	model.count({
		task    : data.task,
		date_doit    : data.date_doit
	}, (err, count) => {
		if (err) {
			return bad(err);
		}

		if (count === 0 || action === 'update') {
			return ok();
		}

		bad(libErr.valid('Record no unique'));
	});
});

/**
 * Add record.
 *
 * @param data
 *
 * @return {{Promise}}
 */
module.exports.save = data => new Promise((ok, bad) => {
	isValid(data)
		.then(() => {
			model.insert(data, (err, data) => {
				if (err) {
					return bad(err);
				}

				let rec = Object.assign({}, data[0]);
				rec._id = Number(rec._id);
				ok(rec);
			})
		}, bad);
});

/**
 * Delete record from storage.
 *
 * @param {number} id
 *
 * @return {{Promise}}
 */
module.exports.delete = id => new Promise((ok, bad) => {
	model.remove({_id : id}, err => err ? bad(err) : ok());
});

/**
 * Update record with validation.
 *
 * @param {object} data
 *
 * @return {{Promise}}
 */
module.exports.updateSafe = (data) => new Promise((ok, bad) => {
	isValid(data, 'update')
		.then(() => {
			let setData = Object.assign({}, data);
			delete setData._id;
			model.update({_id: data._id}, setData, err => {
				if (err) {
					return bad(err);
				}

				ok();
			})
		}, bad);
});

/**
 * Add many record.
 *
 * @param {[{object}]}data
 *
 * @return {{Promise}}
 */
module.exports.addMany = data => new Promise((ok, bad) => {
	async.forEach(data, (rec, next) => {
		model.findOne({
				title    : rec.title,
				login    : rec.login
			}, (err, doc) => {
				if (err) {
					return next(err);
				}

				if (rec._id) {
					delete rec._id;
				}

				if (!doc) {
					return model.insert(rec, e => next(e));
				}

				model.update({_id: doc._id}, rec, next);
			});
	}, err => err ? bad(err) : ok());
});

/**
 *  Get all record.
 *
 *  @return {{Promise}}
 */
module.exports.list = () => new Promise((ok, bad) => {
	model.find({},  (err, cur) => {
		if (err) {
			return bad(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			let arStore = [];

			list.map(rec => {
				let newRec = Object.assign({}, rec);
				newRec.id = Number(rec._id);
				delete newRec._id;
				arStore.push(newRec);
			});

			ok(arStore);
		})
	});
});
