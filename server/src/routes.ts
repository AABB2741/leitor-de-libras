import { Router } from "express";

// Import de todos os controllers
import { Ping } from "./controllers/Ping";
import { CreateUser } from "./controllers/CreateUser";

const router = Router();

const PingController = new Ping();
const CreateUserController = new CreateUser();

router.get("/ping", PingController.handle);
router.post("/signUp", CreateUserController.handle);

export { router };
