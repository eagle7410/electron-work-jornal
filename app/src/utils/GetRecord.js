const textField = ['title', 'login', 'pass', 'answer'];
const getRecord = (id, store) => {
	let record = {};
	['desc', 'category'].concat(textField).map(field => record[field] = store[field]);

	if (id) {
		record._id = id;
	}
	return record;
};

export {textField, getRecord};
