const libError = require('./errors');
const fs       = require('fs');

/**
 * Get file content.
 *
 * @param {string} path
 *
 * @return {{Promise}}
 */
const fileContent = path => new Promise((ok, bad) => {
	fs.readFile(path, (err, data) => {

		if (err) {
			console.log(`Error read file ${path}`, e);
			return bad(libError.sdf('Error read file.'));
		}

		ok(data.toString());

	})
});

/**
 * Decode string use password.
 *
 * @param {string} pass
 * @param {string} code
 *
 * @return {string}
 */
const toWord = (pass, code) => {
	let buf = '';
	let res = '';
	let k   = 0;
	let z   = 0;

	for (let i = 0; i < code.length; i++) {
		if (code.charAt(i) === '#') {
			buf = code.substr(k, (i - k));
			k = i + 1;
			if (z === (pass.length)) z = 0;
			res += String.fromCharCode(parseInt(buf) - pass.charCodeAt(z));

			z++;
		}
	}
	return res;
};

/**
 * Decode data
 * @param {string} data
 *
 * @return {{Promise}}
 */
const decodeData = data => new Promise(ok => {
	let buff = data.replace(/\r/g, '').split("\n");
	let pass = (buff.shift())
		.split('#')
		.map(char => String.fromCharCode(Number(char) / 2))
		.slice(0, -1)
		.join('');

	let decodeData = [];

	while (buff.length) {
		decodeData.push({
			title    : toWord(pass, buff.shift()),
			login    : toWord(pass, buff.shift()),
			pass     : toWord(pass, buff.shift()),
			answer   : toWord(pass, buff.shift()),
			desc     : toWord(pass, buff.shift()),
			category : 3
		});
	}

	ok(decodeData);

});

/**
 * Decode file.
 *
 * @param path
 *
 * @return {{Promise}}
 */
module.exports.content = path => new Promise((ok, bad) => {
	fileContent(path)
		.then(decodeData)
		.then(ok)
		.catch(bad);
});
