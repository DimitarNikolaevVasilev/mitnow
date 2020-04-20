const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const querystring = require('querystring');
const env = require('./env');

module.exports = {
	setTokenCookie(res, token){
		res.setCookie('token', token, {
			domain: env.server.domain,
			path: '/',
			signed: false, // falta HTTPS por ahora
			expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 64) // 64 days
		});
	},
	async post(options, data, json = false){
		data = (json && typeof data == 'object') ? JSON.stringify(data) : querystring.encode(data);
		options.headers = {
			'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(data)
		};
		options.method = 'POST';
		return await this.request(options, data, json);
	},
	async get(options, data, json = false){
		options.method = 'GET';
		if(json && typeof data == 'object')data = JSON.stringify(data);
		return await this.request(options, data, json);
	},
	request(options, data = '', json = false){
		if(json && typeof data == 'object')data = JSON.stringify(data);
		return new Promise((resolve, reject) => {
			let request = options.port === 443 ? https.request(options) : http.request(options);
			request.on('response', res => {
				let result = {
					'httpVersion': res.httpVersion,
					'httpStatusCode': res.statusCode,
					'headers': res.headers,
					'body': '',
				};
				res.on('data', chunk => {
					result.body += chunk;

				});
				res.on('end', () => {
					try{
						result.json = JSON.parse(result.body);
					}catch(_){}
					resolve(result);
				});
			});
			request.on('err', err => {
				reject(err);
			});

			request.write(data);
			request.end();
		});
	},
	Importer: {
		callDirSync(dirs, params, funct){
			dirs = dirs instanceof Array ? dirs : [dirs];
			let results = {};

			dirs.forEach(dir => {
				results[dir] = [];
				fs.readdirSync(dir, {withFileTypes: true}).filter(file => file.isFile()).forEach(file => {
					let mod = require(path.join(dir, file.name));
					
					if(funct)return funct(file, mod, params);
					results[dir].push({
						file: file.name,
						result: mod.apply(mod, params)
					});
				});
			});

			return dirs.length === 1 ? results[dirs[0]] : results;
		}
	}
}
