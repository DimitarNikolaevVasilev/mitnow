module.exports = {
	email(email){
		// unicode support regex
		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(email);
	},
	pw(pw){
		var re =  /^(?=.*[a-z])(?=.*[0-9])\S{8,30}$/i; // por lo menos 1 letra y 1 numero
		return re.test(pw);
	},
	phoneNumber(number){
		number = number + '';
		number.replace(/\s/g, '');
		var re = /^\(\+[1-9]{1,4}\)\d{4,16}$/;
		return re.test(number);
	},
};
