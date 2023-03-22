import { Router } from "express";

// Importar controllers aqui
import { PingController } from "./controllers/server/ping/PingController";

import { GetAvatarsController } from "./controllers/data/getAvatars/GetAvatarsController";

import { LoginController } from "./controllers/users/login/LoginController";
import { CreateUserController } from "./controllers/users/createUser/CreateUserController";
import { UpdateUserController } from "./controllers/users/updateUser/UpdateUserController";
import { DeleteUserController } from "./controllers/users/deleteUser/DeleteUserController";

import { RequestRecoveryCodeController } from "./controllers/users/requestRecoveryCode/RequestRecoveryCodeController";
import { DeleteRecoveryCodeController } from "./controllers/users/deleteRecoveryCode/DeleteRecoveryCodeController";
import { CheckRecoveryCodeController } from "./controllers/users/checkRecoveryCode/CheckRecoveryCodeController";
import { SetPasswordContoller } from "./controllers/users/setPassword/SetPasswordController";

const router = Router();

const ping = new PingController();

const getAvatars = new GetAvatarsController();

const login = new LoginController();
const createUser = new CreateUserController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();

const requestRecoveryCodeController = new RequestRecoveryCodeController();
const deleteRecoveryCodeController = new DeleteRecoveryCodeController();
const checkRecoveryCodeController = new CheckRecoveryCodeController();
const setPasswordController = new SetPasswordContoller();

router.get("/ping", ping.handle);

router.get("/data/getAvatars", getAvatars.handle);

router.post("/user/login", login.handle);
router.post("/user/signUp", createUser.handle);
router.put("/user/edit", updateUser.handle);
router.delete("/user/delete", deleteUser.handle);

router.post("/user/requestRecoveryCode", requestRecoveryCodeController.handle);
router.delete("/user/deleteRecoveryCode/:email", deleteRecoveryCodeController.handle);
router.post("/user/checkRecoveryCode", checkRecoveryCodeController.handle);
router.put("/user/setPassword", setPasswordController.handle);

export { router };
