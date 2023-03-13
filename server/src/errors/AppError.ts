export class AppError {
    public readonly code: Code;
    public readonly status: number;

    constructor(message: Code, status = 400) {
        this.code = message;
        this.status = status;
    }
}
