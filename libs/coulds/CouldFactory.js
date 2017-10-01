let Interface = require('./classes/CouldInterface');
let DropBox = require('./classes/DropBox');
let GoogleDrive = require('./classes/GoogleDrive');

class CouldFactory {
	getCould (type) {
		let instance;
		const types = this.types();

		switch (type) {
			case types.dBox:
				instance = new DropBox();
				break;

			case types.google :
				instance = new GoogleDrive();
				break;
		}

		if (instance instanceof Interface) {
			return instance;
		}

		throw new Error('Could not extends Could Interface.');
	}

	types () {
		return {
			google : 'google',
			dBox: 'drop-box'
		};
	}

}

module.exports = new CouldFactory();
