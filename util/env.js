module.exports = {
	server: {
		port: 80,
		domain: 'localhost'
	},
	mysqlURL: process.env.MYSQL_URL || 'mysql://trippy:trippypasslord@localhost/trippy?charset=utf8_general_ci',
	auth:{
		google:{
			app: {
				id: '',
				secret: ''
			},
			aud: '202867949397-95k6vuv2nu9vr9m0hi9s8fcuj6elu4c4.apps.googleusercontent.com'
		}
	}
};
