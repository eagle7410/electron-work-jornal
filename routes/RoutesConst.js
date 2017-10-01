const dBox = 'drop-box';
const connect = `${dBox}-connect`;
const upload = `${dBox}-upload`;
const download = `${dBox}-download-archive`;
const Routes = {
	appInit   : 'app-init',
	auth      : 'auth',
	prj       : 'project',
	usr       : 'user',
	usrList   : 'users-list',
	store     : 'storage',
	dropBoxConLink  : `${connect}-link`,
	dropBoxAccess   : `${connect}-access-token`,
	cloudInit  : `${connect}-init`,
	dropBoxConCheck : `${connect}-check`,
	dropBoxSetToken : `${connect}-token`,
	cloudUpload        : upload,
	cloudUploadArchive : `${upload}-create-archive`,
	cloudDownloadArchive : download,
	cloudDownloadArchiveExtract : `${download}-extract`,
	cloudDownloadArchiveMerge   : `${download}-merge`,
	cloudDownloadArchiveClear   : `${download}-clear`
};

module.exports = Routes;
