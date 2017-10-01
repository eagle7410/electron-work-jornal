const assert = require('assert');
const couldFactory = require('../libs/coulds/CouldFactory');
const pathManager = require('../libs/path-manager');
const drive = couldFactory.getCould(couldFactory.types().google);

describe('Check Google.Drive', () => {
	it('Check Google.Drive fail connect', function() {

		return new Promise(ok => {

			drive.setPathToAccessToken(`${__dirname}/data`)
				.then(() => drive.connectInit())
				.then(() => {
					assert.ok(false);
					ok();
				})
				.catch(() => {
					assert.ok(true);
					ok();

				})

		})
	});

	it('Check Google.Drive no access token data', function() {

		return new Promise(ok => {

			drive.setPathToAccessToken(`${__dirname}`)
				.then(() => drive.connectInit())
				.then(() => {
					assert.ok(drive.getStatus() === drive.getStatuses().noAccessToken);
					ok();
				})
				.catch((e) => {
					console.log('error', e);
					assert.ok(false);
					ok();
				})

		})
	});

	it('Check Google.Drive connect normal', function() {

		return new Promise(ok => {

			drive.setPathToAccessToken(pathManager.getPathDropBoxData())
				.then(() => drive.connectInit())
				.then((res) => {
					assert.ok(drive.getStatus() === drive.getStatuses().initOk);
					ok();
				})
				.catch((e) => {
					console.log('error', e);
					assert.ok(false);
					ok();
				})

		});


	});

	const d = new Date();

	const fileName = `test_data_${d.getTime()}.zip`;

	it('Check Google.Drive to could', function() {

		return new Promise(ok => {
			drive.moveToCould(`${__dirname}/data/test_data.zip`, fileName)
				.then((r) => {
					assert.ok(r.id ? true : false);
					ok();
				})
				.catch(e => {
					console.log('error', e);
					assert.ok(false);
					ok();
				})

		})
	});

	it('Check Google.Drive from could', function() {

		return new Promise(ok => {
			drive.moveFromCould(`${__dirname}/data`, fileName)
				.then((r) => {
					const path = `${__dirname}/data/${fileName}`;

					if (pathManager.checkExistSync(path)) {
						pathManager.deleteFolderRecursive(path);
						assert.ok(true);
						return ok();
					}

					assert.ok(false);
					ok();
				})
				.catch(e => {
					console.log('error', e);
					assert.ok(false);
					ok();
				})

		})
	});

	after(function() {
		return new Promise(ok => {
			drive.deleteInCould(fileName)
				.then((r) => {
					assert.ok(true);
					ok();
				})
				.catch(e => {
					console.log('error', e);
					assert.ok(false);
					ok();
				})
		});
	});
});

