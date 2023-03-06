import { Router } from "express";

// Import de todos os controllers
import { Ping } from "./controllers/Ping";

const router = Router();

const PingController = new Ping();

router.get("/ping", PingController.handle);

export { router };
