const fs = require('fs');

const correctRoutes = () => new Promise((ok, bad) => {
	const path = '../app/src/const/Routes.js';
	fs.readFile(path, 'utf8', (err,data) => {
		if (err) {
			console.log(err);
			return bad();
		}

		data = data.toString()
			.replace(/const index([^\n])+/, 'const index     = routes.login;')
			.replace(/const afterAuth([^\n])+/, 'const afterAuth = routes.storage;');

		fs.writeFile(path, data, err => {
			if (err) {
				console.log('Routes.js', err);
				return bad();
			}

			console.log('Routes.js ok');
			return ok();
		});

	});
});

const setRoutesToProd = () => new Promise((ok, bad) => {
	const path = '../app/src/const/apiRoutes.js';
	fs.readFile(path, 'utf8', (err,data) => {
		if (err) {
			console.log(err);
			return bad();
		}

		data = data.toString();


		fs.writeFile('../routes/RoutesConst.js', data, err => {
			if (err) {
				console.log('setRoutesToPropd err', err);
				return bad();
			}

			console.log('setRoutesToPropd ok');
			return ok();
		});

	});
});

const correctPackageJson = () => new Promise((ok, bad) => {
	const path = '../package.json';
	fs.readFile(path, 'utf8', (err,data) => {
		if (err) {
			console.log(err);
			return bad();
		}

		data = data.toString()
			.replace(/"main"\: "index([^\n])+/, '"main": "index-app.js",');

		fs.writeFile(path, data, err => {
			if (err) {
				console.log('correctPackageJson err', err);
				return bad();
			}

			console.log('correctPackageJson ok');
			return ok();
		});

	});
});

const rebuildStatic = () => new Promise((ok, bad) => {
	const cmd = require('node-cmd');
	const path = require('path');
	let prjPath = path.resolve('..');

	prjPath = prjPath.replace(/\s/g,'\\ ');

	cmd.get(
		`
			rm -r ${prjPath}/html
            cd ${prjPath}/app
            export PUBLIC_URL=../html 
            npm run build
            cp -R ./build ../html
        `,
		function(err, data, stderr){
			if (err) {
				console.log('Err rebuildStatic', err);
				return bad();
			}

			console.log('rebuildStatic ok', data);
			ok();

		}
	);
});

correctRoutes()
	.then(() => setRoutesToProd())
	.then(() => rebuildStatic())
	.then(() => correctPackageJson())
	.then(() => console.log('Success'))
	.catch(e => console.log('Error', e));
