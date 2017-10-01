const assert = require('assert');
const cloudFactory = require('../libs/clouds/CloudFactory');
const DropBox = require('../libs/clouds/classes/DropBox');
const GoogleDrive = require('../libs/clouds/classes/GoogleDrive');

describe('Could factory', () => {
	it('Check get Bad', () => new Promise(ok => {
		try {
			cloudFactory.getCloud('fail');
			assert.ok(false);
		} catch (e) {
			assert.ok(e.message === 'Could not extends Could Interface.');
		}

		ok();
	}));

	it('Check get DropBox', () => new Promise(ok => {
		let cloud = cloudFactory.getCloud(cloudFactory.types().dBox);

		assert.ok(cloud instanceof DropBox);
		ok();
	}));

	it('Check get GoogleDrive', () => new Promise(ok => {
		let could = cloudFactory.getCloud(cloudFactory.types().google);

		assert.ok(could instanceof GoogleDrive);
		ok();
	}));
});
