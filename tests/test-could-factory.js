const assert = require('assert');
const couldFactory = require('../libs/coulds/CouldFactory');
const DropBox = require('../libs/coulds/classes/DropBox');
const GoogleDrive = require('../libs/coulds/classes/GoogleDrive');

describe('Could factory', () => {
	it('Check get Bad', () => new Promise(ok => {
		try {
			couldFactory.getCould('fail');
			assert.ok(false);
		} catch (e) {
			assert.ok(e.message === 'Could not extends Could Interface.');
		}

		ok();
	}));

	it('Check get DropBox', () => new Promise(ok => {
		let could = couldFactory.getCould(couldFactory.types().dBox);

		assert.ok(could instanceof DropBox);
		ok();
	}));

	it('Check get GoogleDrive', () => new Promise(ok => {
		let could = couldFactory.getCould(couldFactory.types().google);

		assert.ok(could instanceof GoogleDrive);
		ok();
	}));
});
