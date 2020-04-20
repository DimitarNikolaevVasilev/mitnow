const validate = require('../util/validate');
const errors = require('../util/errors');
const {setTokenCookie} = require('../util/tools');

const UserService = require('../services/UserService');
const GoogleService = require('../services/GoogleService');

module.exports = {
	async login(req, res){
		if(req.token)return res.send({errors: false});

		let token = await UserService.standardLogin(req.body.user, req.body.password);

		setTokenCookie(res, token);

		res.send({
			errors: false
		});

	},
	async register(req, res){
		if(req.token)return res.send({errors: 'Already logged!'})

		if(!validate.email(req.body.email))throw new errors.BadRequestError("Invalid email address");

		await UserService.register(req.body);
		
		res.send({
			success: true
		});
	},
	async googleLogin(instance){
		GoogleService.register_fastify(instance);
	}
};
