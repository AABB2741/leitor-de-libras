"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
class SignUp {
    handle(req, res) {
        const { body } = req;
        if (!(body === null || body === void 0 ? void 0 : body.email) || !(body === null || body === void 0 ? void 0 : body.password)) {
            return res.status(400).json({
                message: "Formato de login inválido"
            });
        }
        res.status(200).json({
            message: "Ok"
        });
    }
}
exports.SignUp = SignUp;
