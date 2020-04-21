let Promise = require('bluebird');
let tools = require('./tools');
let jwt = Promise.promisifyAll(require('jsonwebtoken'));
let fs = Promise.promisifyAll(require('fs'));
let crypto = Promise.promisifyAll(require('crypto'));



//let publicAdminKey = fs.readFileSync(__dirname + '/../' + env.security.publicAdminKey);



crypto.pbkdf2Async = function(...argv){
	return new Promise((resolve, reject) => {
		crypto.pbkdf2.apply(crypto, Array(...argv, (err, key) => {
			err ? reject(err) : resolve(key);
		}));		
	});
}

 

module.exports = {
	async publicKeyDecrypt(data, key){
		var dataBuffer = Buffer.from(data, 'binary');
		var keyBuffer = Buffer.from(key, 'binary');
		
		return (await crypto.privateDecrypt({
			key: keyBuffer,
			padding: crypto.constants.RSA_PKCS1_PADDING // CARE
		}, dataBuffer)).toString('utf8');
	},

	async hashPassword(args){
		const { pw } = args;
		const salt = (args.salt || await crypto.randomBytes(64)).toString('hex');
		const iter = (args.iter || (await this.generateRandomInt(1024)) + 10000);

		let hash = (await crypto.pbkdf2Async(pw, salt, iter, 64, 'sha512')).toString('hex');
		return `${hash}:${salt}:${iter}`;
	},
	async signToken(data){
		data.payload = data.payload || {};
		data.payload.gnus = data.userId;
		data.payload.uuid = data.uuid;
		//if(data.expiration)data.payload.exp = Math.floor(Date.now() / 100) + data.expiration;

		let hmac = await this.generateRandomString(256);
		let token = await jwt.sign(data.payload, hmac, {
			algorithm: 'HS512',
			subject: 'auth',
			expiresIn: data.expiresIn
		});
		return {token: token, hmac: hmac};
	},
	async tokenVerify(token, key, options){
		options = options || { algorithms: ['HS512'] };//, audience: 'urn: gnus'}; // gnus == token id in db
		return jwt.verifyAsync(token, key, options); // decoded
	},
	async generateRandomString(length){
		let buf = await crypto.randomBytes(length);
		return buf.toString('hex').substring(length);
	},
	async generateRandomInt(maxLength){
		let buf = await crypto.randomBytes(7).toString('hex');
		return parseInt(buf, 16) % maxLength;
	},
	async textDecript(text, key, iv, algorithm = 'aes256'){
		let decipher = await crypto.createDecipheriv(algorithm, key, iv);
		let decripted = decipher.update(text);
		return Buffer.concat([decripted, decipher.final()]);
	},
	async checkRecaptcha(req){
		if(process.env.debug)return true;

		var key = req.body['g-recaptcha-response'];
		var ip = req.connection.remoteAddress;
		var data = {
			secret: config.security.recaptcha,
			response: key,
			remoteip: ip
		};

		if(!key || !ip)throw('incorrect_recaptcha');

		let result = await tools.post({
			host: 'www.google.com',
			port: 443,
			path: '/recaptcha/api/siteverify'
		}, data, true);
		return result.success;
	},
	// Funcion para seguridad superior. Seguramente no la usemos
	// Se genera con otro programa
	async checkAdminToken(token){
		let split = token.split('.');
		let payload_text = split[0];
		let signed = split[1];
		let verify = crypto.createVerify('sha512WithRSAEncryption');
		let r, payload;

		verify.write(payload_text);
		verify.end();
		r = verify.verify(this.publicAdminKey, signed, 'hex');
		try{
			payload = JSON.parse(Buffer.from(payload_text,'base64').toString());
		}catch(_){return false;}
		
		if(!r || payload.expires < Date.now())return false;
		return payload;
	},
	start(){
	}
};
