import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const getPath           = data => reqFull(get, Routes.cloudGetPath, data);
const setConfigFile     = data => reqFull(save, Routes.cloudSaveConfig, data);
const initConnect       = data => reqFull(get, Routes.cloudInit, data);
const postArchive       = data => reqFull(save, Routes.cloudUploadArchive, data);
const getArchive        = data => reqFull(get, Routes.cloudDownloadArchive, data);
const putCloudArchive   = data => reqFull(update, Routes.cloudUpload, data);
const extractArchive    = date => reqFull(update, Routes.cloudDownloadArchiveExtract, date);
const mergeArchive      = date => reqFull(save, Routes.cloudDownloadArchiveMerge, date);
const clearArchive      = date => reqFull(move, Routes.cloudDownloadArchiveClear, date);

export {
	getPath,
	setConfigFile,
	initConnect,
	postArchive,
	putCloudArchive,
	getArchive,
	extractArchive,
	mergeArchive,
	clearArchive,
};
