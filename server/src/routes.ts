import { Router } from "express";

// Importar controllers aqui
import { LoginController } from "./controllers/users/login/LoginController";
import { CreateUserController } from "./controllers/users/createUser/CreateUserController";

const router = Router();

const login = new LoginController();
const createUser = new CreateUserController();

router.post("/login", login.handle);
router.post("/signUp", createUser.handle);

export { router };
