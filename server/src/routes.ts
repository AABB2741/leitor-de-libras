import { Router } from "express";

// Importar controllers aqui
import { PingController } from "./controllers/server/ping/PingController";

import { LoginController } from "./controllers/users/login/LoginController";
import { CreateUserController } from "./controllers/users/createUser/CreateUserController";

const router = Router();

const ping = new PingController();

const login = new LoginController();
const createUser = new CreateUserController();

router.get("/ping", ping.handle);

router.post("/login", login.handle);
router.post("/signUp", createUser.handle);

export { router };
