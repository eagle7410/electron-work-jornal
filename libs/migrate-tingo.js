const modelConst = require('../modelConst');
const Engine = require('tingodb')();

/**
 * Merge data in collection different databases.
 * @method mergeCollection
 *
 * @param  {object}     db
 * @param  {string}     name
 * @param  {Collection} modelSet
 * @param  {[string]}   props
 *
 * @return {{Promise}}
 */
const mergeCollection = (db, name, modelSet, props) => new Promise((ok, bad) => {
	db.collection(name).find({}, (err, cur) => {
		if (err) {
			return cb(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			let objList = [];

			list.map(rec => {
				let setRecord = {};
				props.map(prop => setRecord[prop] = rec[prop]);
				objList.push(setRecord);
			});

			modelSet.addMany(objList).then(() => ok(), err => bad(err));
		})
	})
});


/**
 * Merge data.
 * @method up
 *
 * @param  {Collection} modelUsers
 * @param  {Collection} modelStorage
 * @param  {Collection} modelCategories
 * @param  {string} pathExtract
 *
 * @return {{Promise}}
 */
module.exports.up = (modelUsers, modelStorage, modelCategories, pathExtract) => new Promise((ok, bad) => {
	const db = new Engine.Db(pathExtract, {});
	const propsStore = [
		'project'   ,
		'date_doit' ,
		'comment'   ,
		'task'      ,
		'hours'     ,
		'hours_fact'
	];

	mergeCollection(db, modelConst.store, modelStorage, propsStore)
		.then(() => mergeCollection(db, modelConst.prj, modelCategories, ['name','_id']))
		.then(() => mergeCollection(db, modelConst.usr, modelUsers, ['login','pass','_id']))
		.then(() => ok())
		.catch(e => bad(e));
});
