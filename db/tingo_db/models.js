/**
 * Factory for models.
 *
 * @param {object} db
 * @param {string} name
 *
 * @return {object}
 */
module.exports.get = (db, name) => {
	const model = require(`./models/${name}`);
	model.init(db);

	return model;
};
