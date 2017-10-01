const zipFolder = require('zip-folder');
const unzip     = require('unzip');
const fs        = require('fs-extra');

/**
 * Create archive.
 *
 * @param {string} folder
 * @param {string} zipPath
 *
 * @return {{Promise}}
 */
const createArchive = (folder, zipPath) => new Promise(
	(ok, bad) => zipFolder(folder, zipPath, err => err ? bad(err) : ok()));

/**
 * Unzip folder.
 *
 * @param pathZip
 * @param pathExtract
 *
 * @return {{Promise}}
 */
const unzipArchive = (pathZip, pathExtract) => new Promise((ok, bad) => {
	fs.createReadStream(pathZip)
		.pipe(unzip.Extract({ path: pathExtract }))
		.on('error', bad)
		.on('close', ok);

});

module.exports = {
	createArhive : createArchive,
	unzipArchive : unzipArchive
};
