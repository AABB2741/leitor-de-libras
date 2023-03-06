"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
class Ping {
    handle(req, res) {
        res.json({
            message: "Olá, mundo!"
        });
    }
}
exports.Ping = Ping;
