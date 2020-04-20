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
	testConnection: async () => {
		await sequelize.authenticate();
		return true;
	}

};
