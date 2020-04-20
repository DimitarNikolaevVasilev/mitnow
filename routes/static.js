const path = require('path');


module.exports = (instance, opts, done) => {
	instance.register(require('fastify-static'), {
		root: path.join(require.main.path, 'public'),
		send: {
			index: true
		}
	});
	done();
}