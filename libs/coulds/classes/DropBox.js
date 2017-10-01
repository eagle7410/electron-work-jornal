const fs = require('fs');
const Interface = require('./CouldInterface');
const pathManager = require('../../path-manager');

module.exports = class CouldDropBox extends Interface {

	constructor() {
		super();

		const that = this;

		that.dbox = require('dropbox');
		that.accessTokenFile = 'drop_box_access.json';

	}

	connectInit() {
		const that = this;

		return new Promise((ok, bad) => {
			const accessJson = pathManager.getPathToFile(that.pathToAccessToken, that.accessTokenFile);

			if (!pathManager.checkExistSync(accessJson)) {
				that._status = that._statuses.noAccessToken;
				ok()
			}

			that.dboxClient = new that.dbox(require(accessJson));

			that.dboxClient.filesListFolder({path: ''})
				.then(response => {

					if (!response.entries) {
						that._status = that._statuses.initBad;
						return bad(response.error || 'No init drop box');
					}

					that._status = that._statuses.initOk;

					ok();
				})
				.catch(bad);
		});
	}

	/**
	 *
	 * @param fileZip {string}
	 * @param fileName {string}
	 * @returns {Promise}
	 */
	moveToCould(fileZip, fileName = pathManager.getArchiveName()) {
		const that = this;

		return new Promise((ok, bad) => {
			fs.readFile(fileZip, (err, content) => {

				if (err) {
					return bad(err);
				}

				that.dboxClient.filesUpload({path: '/' + fileName, contents: content}).then(ok, bad);
			});
		});
	}

	/**
	 *
	 * @param folder {string}
	 * @param fileName {string}
	 * @returns {Promise}
	 */
	moveFromCould(folder, fileName = pathManager.getArchiveName()) {
		const that = this;

		return new Promise((ok, bad) => {
			that.dboxClient.filesDownload({path: '/' + fileName})
				.then((res) => {
					let content = new Buffer(res.fileBinary, "binary");
					fs.writeFile(`${folder}/${fileName}`, content, err => err ? bad(err) : ok())
				})
				.catch(bad);
		});
	}

	/**
	 *
	 * @param fileName
	 * @returns {Promise}
	 */
	deleteInCould(fileName) {
		const that = this;

		return new Promise((ok, bad) => {

			that.dboxClient.filesDelete({path: '/' + fileName})
				.then(ok)
				.catch(bad);
		});
	}
}
