const zipFolder = require('zip-folder');
const JSZip     = require('jszip');
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
	(ok, bad) => zipFolder(folder, zipPath, err => err ? bad(err) : ok())
);

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

const writeZipper = (zip, pathSave) => new Promise((ok, bad) => {
	zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
		.pipe(fs.createWriteStream(pathSave))
		.on('finish', ok)
		.on('error', bad);
});
/**
 * Save content to zip file.
 * @param {string} content
 * @param {string} fileNameInZip
 * @param {string} pathSave
 * @returns {Promise.<void>}
 */
const createArchiveByContent = async (content, fileNameInZip, pathSave) => {
	let zip = new JSZip();

	zip.file(fileNameInZip, content);

	await writeZipper(zip, pathSave);

};

module.exports = {
	createArhive : createArchive,
	createArchiveByContent: createArchiveByContent,
	unzipArchive : unzipArchive
};
