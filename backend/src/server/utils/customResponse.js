class Util {
	constructor() {
		this.statusCode = null;
		this.type = null;
		this.data = null;
		this.message = null;
	}

	setSuccess(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.type = 'success';
	}

	setError(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.type = 'error';
		this.data = data;
	}

	send(res) {
		const result = {
            statusCode : this.statusCode,
			status: this.type,
			message: this.message,
			data: this.data,
		};

		return res.status(this.statusCode).json(result);
	}
}

export default Util;
