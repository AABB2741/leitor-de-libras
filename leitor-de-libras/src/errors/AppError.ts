export default class AppError {
	code: ResponseCode;

	constructor(code: ResponseCode) {
		this.code = code;
	}
}
