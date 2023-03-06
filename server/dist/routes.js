"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// Import de todos os controllers
const Ping_1 = require("./controllers/Ping");
const router = (0, express_1.Router)();
exports.router = router;
const PingController = new Ping_1.Ping();
router.get("/ping", PingController.handle);
