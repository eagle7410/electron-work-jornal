import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const getLink           = data => reqFull(get, Routes.dropBoxConLink, data);
const getAccess         = data => reqFull(get, Routes.dropBoxAccess);
const getConnect        = data => reqFull(get, Routes.dropBoxConInit);
const postArchive       = data => reqFull(save, Routes.dropBoxUploadArchive);
const getArchive        = ()   => reqFull(get, Routes.dropBoxDownloadArchive);
const putDropBoxArchive = date => reqFull(update, Routes.dropBoxUpload, date);
const extractArchive    = date => reqFull(update, Routes.dropBoxDownloadArchiveExtract, date);
const mergeArchive      = date => reqFull(save, Routes.dropBoxDownloadArchiveMerge, date);
const clearArchive      = date => reqFull(move, Routes.dropBoxDownloadArchiveClear, date);
const setToken          = date => reqFull(save, Routes.dropBoxSetToken, date);

export {
	getLink,
	getAccess,
	getConnect,
	postArchive,
	putDropBoxArchive,
	getArchive,
	extractArchive,
	mergeArchive,
	clearArchive,
	setToken
};
