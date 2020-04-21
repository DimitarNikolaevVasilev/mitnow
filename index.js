const path = require('path');
const db = require('./db/db');
const env = require('./util/env');
const fastify = require('fastify')({
	logger: false
});


fastify.setErrorHandler((err, req, reply) => {
	console.log(err);

	// Validate error code, if internal. Don't show
	reply.send(err);
});

fastify.register(require('fastify-cors'), {
	origin: true
});

fastify.register(require('fastify-cookie'), {
	secret: 'my-secret'
});


// Faltan componentes como static, caching, sec headers, rate y balance limit...
// A lo mejor agregar websocket ? Para chat?



/*
Configurar en fase prod
fastify.register(require('fastify-helmet'), {});
*/






const { Importer }  = require('./util/tools');


Importer.callDirSync([
	path.join(__dirname, 'routes/public'),
	path.join(__dirname, 'routes/admin'),	
	path.join(__dirname, 'routes')
], [], (file, route) => {
	fastify.register(route);
});



const start = async () => {
	try{
		await fastify.listen(env.server.port);

		try{
			await db.testConnection();
			console.log("DB connected");
		}catch(err){
			console.error(err);
			process.exit(1);
		}


		console.log(`server listening on ${fastify.server.address().port}`);
	} catch (err){
		//fastify.log.error(err);
		console.error(err);
		//process.exit(1);
	}
}


start();
