const fs = require('fs');

const createServer = () => new Promise((ok, bad) => {
	fs.readFile('../server-dev.js', 'utf8', (err,data) => {
		if (err) {
			console.log(err);
			return bad();
		}

		data = data.toString().replace(/\n(.*)console\.log\(\`\:\: \$\{action\}([^\n])+/, '')
			.replace('db_test', 'db')
			.replace('RoutesConstDev', 'RoutesConst');

		fs.writeFile('../server.js', data, err => {
			if (err) {
				console.log('Server not save ', err);
				return bad();
			}

			console.log('Server create');
			return ok();
		});

	});
});

const createIndex = () => new Promise((ok, bad) => {
	fs.readFile('../index-app-dev.js', 'utf8', (err,data) => {
		if (err) {
			console.log(err);
			return bad();
		}


		data = data.toString().replace('const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require(\'electron-devtools-installer\');\n' +
			'\t//noinspection JSUnresolvedFunction\n' +
			'\tinstallExtension(REACT_DEVELOPER_TOOLS)\n' +
			'\t\t.then((name) => console.log(`Added Extension:  ${name}`))\n' +
			'\t\t.catch((err) => console.log(\'An error occurred: \', err));\n' +
			'\t//noinspection JSUnresolvedFunction\n' +
			'\tinstallExtension(REDUX_DEVTOOLS)\n' +
			'\t\t.then((name) => console.log(`Added Extension:  ${name}`))\n' +
			'\t\t.catch((err) => console.log(\'An error occurred: \', err));', '')
			.replace('mainWindow.maximize();\n' +
				'\t\t\tmainWindow.toggleDevTools();\n' +
				'\n' +
				'\t\t\tmainWindow.loadURL(\'http://localhost:3000/\');', 'mainWindow.loadURL(`file://${__dirname}/html/index.html`);')
			.replace('./server-dev', './server');

		fs.writeFile('../index-app.js', data, err => {
			if (err) {
				console.log('Index not save ', err);
				return bad();
			}

			console.log('Index create');
			return ok();
		});

	});
});

createServer()
	.then(createIndex)
	.then(() => console.log('!!!Success'))
	.catch(() => {
		console.log('!!!Fail');
	})
