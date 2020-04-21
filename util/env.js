module.exports = {
	server: {
		port: 80,
		hostURL: 'http://localhost'
	},
	emailService: {
		SendGrid_api_key: '',
		fromConfirmationEmail: 'app@mitnow.com'
	},
	phoneService: {
		nexmo_api_key: '',
		nexmo_api_secret: ''
	},
	mysqlURL: process.env.MYSQL_URL || 'mysql://mitnow:password@localhost/mitnow?charset=utf8_general_ci',
	auth:{
		google:{
			app: {
				id: '',
				secret: ''
			},
			aud: ''
		}
	}
};
