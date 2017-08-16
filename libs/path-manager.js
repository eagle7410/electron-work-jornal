const fs   = require('fs-extra');
const path = require('path');
const fileName    = 'data-task.zip';
const pathArchive = path.join(__dirname, '..', 'archives');
const pathUpload  = path.join(pathArchive, 'upload');

/**
 * Return upload dir.
 * @param {string} date
 */
const getUploadPath = date => path.join(pathUpload , date);

/**
 * Check exist path.
 * if path not exists try create him.
 *
 * @param {string} path
 *
 * @return {{Promise}}
 */
const checkPath = path => new Promise((ok,bad) => fs.exists(path, exists => exists ? ok() : fs.mkdir(path, e => e ? bad(e) : ok())));

const checkDownloadFolder = date => new Promise((ok, bad) => {
	let pathToday =  getUploadPath(date);

	checkPath(pathArchive)
		.then(() => checkPath(pathUpload))
		.then(() => checkPath(pathToday))
		.then(ok(pathToday))
		.catch(e => bad(e));

});

/**
 * Get acrhive file name.
 * @method getArchiveName
 * @return {string}
 */
const getArchiveName = () => fileName;
let dbFolder = null;

/**
 * Get path folder to database.
 *
 * @method getPathDb
 * @return {string}
 */
const getPathDb = () => path.join(__dirname, '..', dbFolder, 'tingo_db', 'data');

/**
 * Return path to new archive
 * @method getNewArchivePath
*  @param  {string} date
 * @return {string}
 */
const getNewArchivePath = date => path.join(pathArchive, date, fileName);

/**
 * Check exist path to new archive.
 * if no exist create him.
 * @method checkFolderNewArchive
 * @param  {string}  date
 * @return {{Promise}}
 */
const checkFolderNewArchive = date => new Promise((ok, bad) => {
	let pathToday = path.join(pathArchive, date);
	let pathZip = getNewArchivePath(date);

	checkPath(pathArchive)
		.then(() => checkPath(pathToday))
		.then(
			() => fs.exists(pathZip, exists => exists ? fs.unlink(pathZip, e => e ? bad(e) : ok() ) : ok())
		)
		.catch(e => bad(e));

});

/**
 * Delete path.
 * @param {string} dir
 */
const deleteFolderRecursive = dir => fs.mkdirpSync(dir);

module.exports = {
	checkFolderNewArchive : checkFolderNewArchive,
	getNewArchivePath : getNewArchivePath,
	getPathDb : getPathDb,
	getArchiveName : getArchiveName,
	checkDownloadFolder : checkDownloadFolder,
	getUploadPath : getUploadPath,
	deleteFolderRecursive : deleteFolderRecursive,
	setDbFolder : (folder) => {
		dbFolder = folder;
	}
};
