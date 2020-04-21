const sec = require('../util/sec');
const errors = require('../util/errors');

const { models } = require('../db/db');
const EmailService = require('./EmailService');

module.exports = {
	async register(data){
		let hash = await sec.hashPassword({pw: data.password});

		return await models.usuario.findOrCreate({
			where: {email: data.email},
			defaults: {
				email: data.email,
				pass: hash
			}
		}).spread(async (user, created) => {
			if(!created)throw new errors.UnprocessableEntity("email taken");
			await EmailService.sendConfirmationEmail(user);
		});
	},
	async standardLogin(username_email, password){
		const error_msg = "user or password incorrect";

		let user = await models.usuario.findOne({
			where: {email: username_email}
		});
		if(!user)throw new errors.NotAuthorizedError(error_msg);

		let hashParts = user.hash.split(':');

		let hash = await sec.hashPassword({
			pw: password,
			salt: hashParts[1],
			iter: +hashParts[2]
		});

		if(hash !== user.hash)throw new errors.NotAuthorizedError(error_msg);

		// Faltaria agregar parametros como aud, iat, sub...
		let { token, hmac }  = await sec.signToken({
			userId: user.idUsuario,
			expiresIn: 60 * 60 * 24 * 64, // 64 days
			payload: {
				email: user.email
			}
		});

		await models.token.create({
			idUsuario: user.idUsuario,
			token: token,
			hmac: hmac
		});

		return token;
	}
};
