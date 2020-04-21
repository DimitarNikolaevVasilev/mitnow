const validate = require('../util/validate');
const errors = require('../util/errors');
const {setTokenCookie} = require('../util/tools');

const UserService = require('../services/UserService');
const GoogleService = require('../services/GoogleService');
const EmailService = require('../services/EmailService');
const PhoneService = require('../services/PhoneService');

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
		if(req.token)throw new errors.UnauthorizedError('Already logged in');

		if(!validate.email(req.body.email))throw new errors.BadRequestError("Invalid email address");

		await UserService.register(req.body);
		res.send({
			success: true
		});
	},
	async googleLogin(instance){
		GoogleService.register_fastify(instance);
	},
	async verifyEmail(req, res){
		let verified = await EmailService.verifyEmail({
			id: req.query.id,
			token: req.query.token
		});
		res.send({verified: verified});
	},
	async verifyPhoneNumber(req, res) {
		if(!validate.phoneNumber(req.body.phoneNumber))throw new errors.BadRequestError("invalid phone number");

		let result = await PhoneService.sendVerificationCode(req.body.phoneNumber);
		res.send(result);
	},
	async verifyPhoneNumberCode(req, res) {
		let result = await PhoneService.verifyPhoneNumberCode(req.body.request_id, req.body.code);

		// A lo mejor pensar en comprobar más errores?
		res.send({success: !result.status});
	}
};
