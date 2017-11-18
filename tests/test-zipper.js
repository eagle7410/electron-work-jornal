const assert = require('assert');
const zipper = require('../libs/zipper');

describe('Check zipper', () => {
	it('Check zipper content', function() {
		return new Promise(done => {
			var json = '{"users":[{"login":"igor","pass":"c506314c56934aeb84c1df2674d928cc1df23c66cd75e1791fb40e4e8e1ae324","_id":6}],"store":[{"project":2,"date_doit":"2017-08-21","comment":"","task":"154","hours":"8","hours_fact":"","id":2},{"comment":"Include vue routes rr","date_doit":"2017-09-28","hours":"0.1","hours_fact":"3","project":2,"task":"n122","id":3},{"project":2,"date_doit":"2017-08-18","comment":"Inlude vue app","task":"n2","hours":"7","hours_fact":"7","id":4},{"project":2,"date_doit":"2017-08-22","comment":"Change place leaflet and adapters","task":"n2","hours":"","hours_fact":"","id":5},{"project":2,"date_doit":"2017-08-23","comment":"Doit 17-08-24","task":"155","hours":"4","hours_fact":"4","id":6},{"project":2,"date_doit":"2017-08-22","comment":"","task":"156","hours":"8","hours_fact":"8","id":7},{"project":2,"date_doit":"2017-08-30","comment":"","task":"172","hours":"8","hours_fact":"","id":8},{"project":2,"date_doit":"2017-08-31","comment":"","task":"171","hours":"8","hours_fact":"","id":9},{"project":2,"date_doit":"2017-09-01","comment":"","task":"inlude carrt on map","hours":"8","hours_fact":"","id":10},{"project":2,"date_doit":"2017-09-01","comment":"","task":"Problem with ais-dev show map","hours":"3","hours_fact":"","id":11},{"project":2,"date_doit":"2017-09-28","comment":"Show Only one field fullscreen","task":"155","hours":"2","hours_fact":"","id":12},{"project":2,"date_doit":"2017-09-28","comment":"Fix import fields (multi polygons)","task":"355","hours":"4.5","hours_fact":"","id":13}],"projects":{"2":"ais-base","3":"test"}}';
			// TODO: Back normal doit
			zipper.createArchiveByContent(json, 'data.json', `${__dirname}/data/data-test-zipper.zip`)
				.then(() => {
					assert.ok(true);
					done();
				})
				.catch((err) => {
					console.log('error', err);
					assert.ok(false);
					done();
				})
		});
	})
});

