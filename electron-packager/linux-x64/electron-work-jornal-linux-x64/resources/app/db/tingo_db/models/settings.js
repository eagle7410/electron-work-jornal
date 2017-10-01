let model = null;

/**
 * Init model.
 * @param {object} db
 */
module.exports.init = db => {
	model = db.collection('settings');
	module.exports.model = model;
};

module.exports.model = null;

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

			ok(list);
		})
	});
});

const typeDBox = 'dropBox';
module.exports.typeDBox = typeDBox;

/**
 * Get settings for drop-box.
 *
 * @return {{Promise}}
 */
module.exports.getSettingsDBox = () => new Promise((ok ,bad) => {
	model.findOne({type : typeDBox}, (err, doc) => {

		if (err || !doc) {
			return bad(err || 'No setting collection');
		}

		ok(doc);
	});
});

/**
 * Set access token for drop-box.
 *
 * @param {object} accessToken
 *
 * @return {{Promise}}
 */
module.exports.setAccessToken = accessToken => new Promise((ok ,bad) => {
	model.findOne({type : typeDBox},  (err, doc) => {
		if (err || !doc) {
			return bad(err || 'No collection setting drop-box');
		}

		doc.accessToken = accessToken;

		model.update({_id : doc._id}, doc, err => {
			if (err) {
				return bad(err);
			}

			ok(accessToken);
		});
	})

});

/**
 * Get request token for drop-box.
 *
 * @return {{Promise}}
 */
module.exports.getRequestToken = () => new Promise((ok ,bad) => {
	model.findOne({type : typeDBox}, (err, doc) => {

		if (err || !doc) {
			return bad(err || 'No setting collectoion');
		}

		ok(doc.requestToken);
	});
});

/**
 * Set request token.
 *
 * @param {object} apiData
 * @param {object} requestToken
 *
 * @return {{Promise}}
 */
module.exports.setRequestToken = (apiData, requestToken) => new Promise((ok, bad) => {

	model.findOne({type : typeDBox},  (err, doc) => {
		if (err) {
			return bad(err);
		}

		if (!doc) {
			return model.insert({
				type : typeDBox,
				apiData : apiData,
				requestToken : requestToken
			}, err => err ? bad(err) : ok(requestToken));
		}

		doc.apiData = apiData;
		doc.requestToken = requestToken;

		model.update({_id: doc._id}, doc, err => err ? bad(err) : ok(requestToken));

	});
});

/**
 * Set api data.
 * @param {object} data
 *
 * @return {{Promise}}
 */
module.exports.setApiData = data => new Promise((ok, bad) => {
	model.findOne({type : typeDBox},  (err, doc) => {
		if (err) {
			return bad(err);
		}

		if (!doc) {
			return model.insert({
				type : typeDBox,
				apiData : data,
			}, err => err ? bad(err) : ok());
		}

		doc.apiData = data;

		model.update({_id: doc._id}, doc, err => err ? bad(err) : ok());

	});
});
