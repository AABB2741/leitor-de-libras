"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Importar controllers aqui
const Ping_1 = require("./controllers/Ping");
const CreateUser_1 = require("./controllers/CreateUser");
const router = (0, express_1.Router)();
exports.router = router;
const PingController = new Ping_1.Ping();
const CreateUserController = new CreateUser_1.CreateUser();
router.get("/ping", PingController.handle);
router.post("/signUp", CreateUserController.handle);
