import { Router } from "express";

// Import de todos os controllers
import { Ping } from "./controllers/Ping";
import { SignUp } from "./controllers/SignUp";

const router = Router();

const PingController = new Ping();
const SignUpController = new SignUp();

router.get("/ping", PingController.handle);
router.post("/signUp", SignUpController.handle);

export { router };
