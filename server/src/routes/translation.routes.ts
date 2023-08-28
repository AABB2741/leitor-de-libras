import { Router } from "express";
import { v4 as uuid } from "uuid";
import { extname, resolve } from "node:path";

import { GetTranslationsController } from "../controllers/data/getTranslations/GetTranslationsController";
import { WatchTranslationController } from "../controllers/data/watchTranslation/WatchTranslationController";
import { DeleteTranslationController } from "../controllers/data/deleteTranslations/DeleteTranslationController";
import { EditTranslationController } from "../controllers/edit/editTranslation/EditTranslationController";
import { EditMultipleController } from "../controllers/edit/editMultiple/EditMultipleController";
import { TranslateController } from "../controllers/translations/translate/TranslateController";
import { UploadImageController } from "../controllers/upload/UploadImage/UploadImageController";
import { UploadVideoController } from "../controllers/upload/UploadVideo/UploadVideoController";
import multer from "multer";

const getTranslationsController = new GetTranslationsController();
const watchTranslationController = new WatchTranslationController();
const deleteTranslationController = new DeleteTranslationController();
const editTranslationController = new EditTranslationController();
const editMultipleController = new EditMultipleController();
const translateController = new TranslateController();
const uploadImageController = new UploadImageController();
const uploadVideoController = new UploadVideoController();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const fileId = uuid();
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

const translationRoutes = Router();

translationRoutes.get("/", getTranslationsController.handle);
translationRoutes.get("/watch", watchTranslationController.handle);
translationRoutes.put("/edit/:id", editTranslationController.handle);
translationRoutes.delete("/delete/:ids", deleteTranslationController.handle);
translationRoutes.put("/editMultiple", editMultipleController.handle);
translationRoutes.get("/translate/:id", translateController.handle);

translationRoutes.post(
	"/upload/image",
	uploadImage.single("file"),
	uploadImageController.handle
);
translationRoutes.post(
	"/upload/video",
	uploadVideo.single("file"),
	uploadVideoController.handle
);

export default translationRoutes;
