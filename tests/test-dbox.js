const assert = require('assert');
const couldFactory = require('../libs/coulds/CouldFactory');
const pathManager = require('../libs/path-manager');
const dropBox = couldFactory.getCould(couldFactory.types().dBox);

describe('Check DropBox', () => {
	it('Check DropBox fail connect', function() {

		return new Promise(ok => {

			dropBox.setPathToAccessToken(`${__dirname}/data`)
				.then(() => dropBox.connectInit())
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

	it('Check DropBox no access token data', function() {

		return new Promise(ok => {

			dropBox.setPathToAccessToken(`${__dirname}`)
				.then(() => dropBox.connectInit())
				.then(() => {
					assert.ok(dropBox.getStatus() === dropBox.getStatuses().noAccessToken);
					ok();
				})
				.catch((e) => {
					console.log('error', e);
					assert.ok(false);
					ok();
				})

		})
	});

	it('Check DropBox connect normal', function() {

		return new Promise(ok => {

			dropBox.setPathToAccessToken(pathManager.getPathDropBoxData())
				.then(() => dropBox.connectInit())
				.then(() => {
					assert.ok(dropBox.getStatus() === dropBox.getStatuses().initOk);
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

	it('Check DropBox to could', function() {

		return new Promise(ok => {
			dropBox.moveToCould(`${__dirname}/data/test_data.zip`, fileName)
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

	it('Check DropBox from could', function() {

		return new Promise(ok => {
			dropBox.moveFromCould(`${__dirname}/data`, fileName)
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
			dropBox.deleteInCould(fileName)
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

