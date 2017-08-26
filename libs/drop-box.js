const dbox = require('./dbox');
const fs   = require('fs');

let app    = null;
let client = null;

/**
 * Init app drop-box
 * @method appInit
 * @param  {string} key
 * @param  {string} secret
 * @return {{module.exports}}
 */
const appInit = (key, secret) => {
	app = dbox.app({'app_key': key, 'app_secret': secret});

	return module.exports;
};

/**
 * Init client in drop-box app.
 *
 * @method clientInit
 *
 * @param  {object}   access_token
 *
 * @return {{module.exports}}
 */
const clientInit = access_token => {
	client = app.client(access_token);

	return module.exports;
};

/**
 * Check connect client drop-box app.
 *
 * @method checkConnect
 *
 * @param  {function}     call
 */
const checkConnect = call => client.account(status => {
	console.log('status ', status);
	return call(status === 200);
});

/**
 * Get request token for drop-box.
 *
 * @return {{Promise}}
 */
const getConfirmLink = () => new Promise((ok, bad) =>
	app.requesttoken((status, requestToken) => status === 200 ? ok(requestToken) : bad())
);

/**
 * Get access token for drop-box.
 *
 * @param requestToken
 *
 * @return {{Promise}}
 */
const getAccessToken = requestToken => new Promise((ok, bad) => {

	app.accesstoken(requestToken, (status, access_token) => {

		if (status !== 200) {
			return bad('Bad request for access_token');
		}

		module.exports.clientInit(access_token);

		checkConnect(okey => okey ? ok(access_token) : bad('Bad access_token'));

	});

});

/**
 * Init connect.
 *
 * @param {object} data
 *
 * @return {{Promise}}
 */
const connectInit = data => new Promise((ok, bad) => {
	const api = data.apiData;
	console.log('data', data);
	appInit(api.apiKey, api.apiSecret)
		.clientInit(data.accessToken);

	checkConnect(okey => okey ? ok() : bad('Err in connectInit'));
});

/**
 * Upload file to drop-box
 * @param {string} fileZip
 * @param {string} fileName
 *
 * @return {{Promise}}
 */
const moveToCould = (fileZip, fileName) => new Promise((ok, bad) => {
	fs.readFile(fileZip, (err, content) =>
		err
			? bad(err)
			: client.put(fileName, content, status => status === 200 ? ok() : bad(`Request return status ${status}`))
	);

});

/**
 * Get archive from drop-box.
 *
 * @method moveFromCould
 *
 * @param  {string}      folder
 * @param  {string}      fileName
 *
 * @return {{Promise}}
 */
const moveFromCould = (folder, fileName) => new Promise((ok, bad) => {
	client.get(fileName,
		(status, reply) =>
			status !== 200
				? bad(`Bad get archive status is ${status}`)
				: fs.writeFile(`${folder}/${fileName}`, reply, err => err ? bad(err) : ok())
	);
});

module.exports = {
	appInit        : appInit,
	clientInit     : clientInit,
	connectInit    : connectInit,
	checkConnect   : checkConnect,
	getConfirmLink : getConfirmLink,
	getAccessToken : getAccessToken,
	moveToCould    : moveToCould,
	moveFromCould  : moveFromCould
};
