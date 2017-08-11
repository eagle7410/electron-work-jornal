/**
 * Types error.
 * @type {{valid: string, auth: string, sdf: string}}
 */
const constants = {
	valid : 'validation',
	auth  : 'auth',
	sdf   : 'sdf',
};

/**
 * Create error validation.
 * @param {string} mess
 */
const valid = mess => ({
	type: constants.valid,
	mess: mess
});

/**
 * Create error authorization.
 * @param {string} mess
 */
const auth = (mess = 'Bad password') => ({
	type: constants.auth,
	mess: mess,
});

/**
 * Create error sdf
 * @param {string} mess
 */
const sdf = mess => ({
	type: constants.sdf,
	mess: mess,
});

module.exports = {
	constants : constants,
	valid     : valid,
	auth      : auth,
	sdf       : sdf
};
