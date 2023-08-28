import { Router } from "express";

import { LoginController } from "../controllers/users/login/LoginController";
import { CreateUserController } from "../controllers/users/createUser/CreateUserController";
import { UpdateUserController } from "../controllers/users/updateUser/UpdateUserController";
import { DeleteUserController } from "../controllers/users/deleteUser/DeleteUserController";
import { GetUserController } from "../controllers/users/getUser/GetUserController";

const login = new LoginController();
const createUser = new CreateUserController();
const updateUser = new UpdateUserController();
const deleteUser = new DeleteUserController();
const getUser = new GetUserController();

const userRoutes = Router();

userRoutes.post("/login", login.handle);
userRoutes.post("/signUp", createUser.handle);
userRoutes.put("/edit", updateUser.handle);
userRoutes.delete("/delete", deleteUser.handle);
userRoutes.get("/get", getUser.handle);

export default userRoutes;
