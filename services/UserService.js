const sec = require('../util/sec');
const errors = require('../util/errors');

const { models } = require('../db/db');

module.exports = {
	async register(data){
		if(await this.emailExists(data.email))throw new errors.UnprocessableEntity("email taken");

		let hash = await sec.hashPassword({pw: data.password});
		
		await models.usuario.create({
			email: data.email,
			pass: hash
		});
	},
	async emailExists(email){
		return await models.usuario.count({
			where: {email: email}
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
