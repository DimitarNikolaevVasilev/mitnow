class NotFoundError extends Error {
	constructor(args){
		super(args);

		this.statusCode = 404;
	}
}

class NotAuthorizedError extends Error {
	constructor(args){
		super(args);

		this.statusCode = 401;
	}
}


class BadRequestError extends Error {
	constructor(args){
		super(args);

		this.statusCode = 400;
	}
}

class UnprocessableEntity extends Error {
	constructor(args){
		super(args);

		this.statusCode = 422;
	}
}

module.exports = {
	'NotFoundError': NotFoundError,
	'NotAuthorizedError': NotAuthorizedError,
	'BadRequestError': BadRequestError,
	'UnprocessableEntity': UnprocessableEntity
};
