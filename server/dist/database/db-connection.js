"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
console.log("Criando sql");
const db = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "li_libras"
});
exports.default = db;
