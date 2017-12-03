import {get, update, save , move, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'
import {DateToString} from '../utils/Date'
import {download} from './Files'

const formatData = data => {
    data.date_doit = DateToString(data.date_doit);

	return data;
};
const type = Routes.store;
const list       = ()   => reqFull(get   , type);
const edit       = data => reqFull(update, type, formatData(data));
const del        = id   => reqFull(move  , type, id);
const addRecord  = data => reqFull(save  , type, formatData(data));
const dataToCsv  = (data, fileName) => {

	let content = `Task number;Project;Hours;Comment\n`;

	for (let day in data) {
		let dataDay = data[day];
		content += `Date doit ${day};;;\n`;
		content += dataDay.tasks.map(task => `Task #${task.task};${task.project};"${task.hours.replace('.', ',')}";"${task.comment.replace(/"/g,'\\"')}"\n`).join('');
	}

	download(content, fileName);
};

export {addRecord, edit, del, list, dataToCsv};
