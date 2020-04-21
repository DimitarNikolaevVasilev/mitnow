const path = require('path');
const env = require('../util/env');
const { Importer } = require('../util/tools');

const { Sequelize, DataTypes }  = require('sequelize');

const sequelize = new Sequelize(env.mysqlURL, {
	pool:{
		max: 5,
		min: 1,
		acquire: 3000
	}
});

let models = Importer.callDirSync(path.join(__dirname, './models'), [sequelize, DataTypes]).reduce((models, o) => {
	models[o.file.replace(/\.[^/.]+$/, "")] = o.result;
	return models;
}, {});


module.exports = {
	models: models,
	sequelize: sequelize,
	async createOrUpdate(model, where, data){
		const result = await sequelize.transaction(async t => {
			let exists = await model.count({where: where}, {transaction: t});
			if(exists){
				await model.update(where, {where: data}, {transaction: t});
			}else{
				await model.create({...where,...data}, {transaction: t});
			}
		});
	},
	testConnection: async () => {
		await sequelize.authenticate();
		return true;
	}

};
