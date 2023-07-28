import { Router } from "express";
import multer from "multer";
import { v4 as UUID } from "uuid";
import { AppError } from "./errors/AppError";
import { extname, resolve } from "node:path";

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
import { SetPasswordController } from "./controllers/users/setPassword/SetPasswordController";

import { GetTranslationsController } from "./controllers/data/getTranslations/GetTranslationsController";
import { WatchTranslationController } from "./controllers/data/watchTranslation/WatchTranslationController";
import { DeleteTranslationController } from "./controllers/data/deleteTranslations/DeleteTranslationController";

import { UploadImageController } from "./controllers/upload/UploadImage/UploadImageController";
import { UploadVideoController } from "./controllers/upload/UploadVideo/UploadVideoController";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const fileId = UUID();
		const extension = extname(file.originalname);
		const filename = fileId.concat(extension);
		cb(null, filename);
	},
});
const uploadImage = multer({
	limits: {
		fileSize: 10_485_760, // 10mb
	},
	fileFilter: (req, file, callback) => {
		const mimetypeRegex = /^(image)\/[a-zA-Z]+/;
		const isValidFileFormat = mimetypeRegex.test(file.mimetype);
		callback(null, isValidFileFormat);
	},
	storage,
});
const uploadVideo = multer({
	limits: {
		fileSize: 134_217_728, // 1 GB
	},
	fileFilter: (req, file, callback) => {
		const mimetypeRegex = /^(video)\/[a-zA-Z]+/;
		const isValidFileFormat = mimetypeRegex.test(file.mimetype);
		callback(null, isValidFileFormat);
	},
	storage,
});

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
const setPasswordController = new SetPasswordController();

const getTranslationsController = new GetTranslationsController();
const watchTranslationController = new WatchTranslationController();
const deleteTranslationController = new DeleteTranslationController();

const uploadImageController = new UploadImageController();
const uploadVideoController = new UploadVideoController();

router.get("/ping", ping.handle);

router.get("/data/getAvatars", getAvatars.handle);

router.post("/user/login", login.handle);
router.post("/user/signUp", createUser.handle);
router.put("/user/edit", updateUser.handle);
router.delete("/user/delete", deleteUser.handle);

router.post("/user/requestRecoveryCode", requestRecoveryCodeController.handle);
router.delete(
	"/user/deleteRecoveryCode/:email",
	deleteRecoveryCodeController.handle
);
router.post("/user/checkRecoveryCode", checkRecoveryCodeController.handle);
router.put("/user/setPassword", setPasswordController.handle);

router.get("/translations", getTranslationsController.handle);
router.get("/watch", watchTranslationController.handle);
router.delete("/translations/delete/:ids", deleteTranslationController.handle);

router.post(
	"/upload/image",
	uploadImage.single("file"),
	uploadImageController.handle
);
router.post(
	"/upload/video",
	uploadVideo.single("file"),
	uploadVideoController.handle
);

export { router };
