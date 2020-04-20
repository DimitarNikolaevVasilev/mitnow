const fs = require('fs');
const path = require('path');

module.exports = (instance, opts, done) => {
	instance.setNotFoundHandler((req, res) => {
		res.type('text/html').send(
			fs.createReadStream(path.join(require.main.path, 'src/others/notFound404.html'))
		);
	});
	done();
};