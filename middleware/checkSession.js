const path = require('path');
const errors = require(require('path').join(require.main.path, 'util/errors'));
const sec = require(path.join(require.main.path, 'util/sec'));

const { models } = require(path.join(require.main.path, 'db/db'));


module.exports = {
	// No comprueba google todavia
	async checkSession(req, res, next, allowEntry){
		try {
			let strToken = req.cookies.token || '';
			let {hmac} = await models.token.findOne({
				attributes: ['hmac'],
				where: {token: strToken}
			}) || {};

			req.token = await sec.tokenVerify(strToken, hmac);
		}catch(_){}
		if(!req.token && !allowEntry) throw new errors.NotAuthorizedError();
		//next();
	},
	async retrieveToken(req, res, next){
		await module.exports.checkSession(req,res,next,true);
	}
};
