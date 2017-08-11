const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu          = electron.Menu;
const server        = require('./server');

app.on('ready', () => {
	let mainWindow = new BrowserWindow({
		width  : 800,
		height : 800,
	});

	server.run(mainWindow)
		.then(() => {
			mainWindow.loadURL(`file://${__dirname}/html/index.html`);

			mainWindow.on('closed', () => {
				mainWindow = null;
				app.quit();
			});

			require('./menu-app').add(Menu, app);
		});
});
