import { Router } from "express";

// Importar controllers aqui
import { PingController } from "./controllers/server/ping/PingController";

import { LoginController } from "./controllers/users/login/LoginController";
import { CreateUserController } from "./controllers/users/createUser/CreateUserController";
import { UpdateUserController } from "./controllers/users/updateUser/UpdateUserController";
import { DeleteUserController } from "./controllers/users/deleteUser/DeleteUserController";

const router = Router();

const ping = new PingController();

const login = new LoginController();
const createUser = new CreateUserController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();

router.get("/ping", ping.handle);

router.post("/user/login", login.handle);
router.post("/user/signUp", createUser.handle);
router.put("/user/edit", updateUser.handle);
router.delete("/user/delete", deleteUser.handle);

export { router };
