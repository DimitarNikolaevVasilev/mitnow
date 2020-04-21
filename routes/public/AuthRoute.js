const userController = require('../../controllers/userController');
const { retrieveToken } = require('../../middleware/checkSession');

module.exports = (instance, opts, done) => {
	instance.addHook('preHandler', retrieveToken);

	instance.post('/login', {
		schema: {
			body: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: {type: 'string', maxLength: 100},
					password: {type: 'string', maxLength: 200}
				}
			}
		}
	}, userController.login);


	instance.post('/register', {
		schema: {
			body: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: {type: 'string'},
					password: {type: 'string'},

					// Pedimos el nombre despues del registro?
					// En la sección de editar perfil?

					//nombre: {type: 'string'},
					//fecha_de_nac: {type: 'string'}
				}
			}
		}
	}, userController.register);


	// Cambiar por post, si se realiza una llamada ajax?
	// schema: query: id | token
	instance.get('/verify_email', userController.verifyEmail);


	instance.post('/verify_phone_number', userController.verifyPhoneNumber);
	instance.post('/verify_phone_number_code', userController.verifyPhoneNumberCode);

	userController.googleLogin(instance);



	instance.post('/checkSession', {} , (req, res) => {
		console.log(req.cookies);
		res.send({ok: true, a: req.token});
	});

	done();
}
