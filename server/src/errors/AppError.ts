export class AppError {
    public readonly code: Code;
    public readonly status: number;

    constructor(code: Code, status = 400) {
        this.code = code;
        this.status = status;
    }
}
