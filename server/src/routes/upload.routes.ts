import { Router } from "express";
import { v4 as uuid } from "uuid";
import { extname, resolve } from "node:path";
import multer from "multer";

import { UploadImageController } from "../controllers/upload/UploadImage/UploadImageController";
import { UploadVideoController } from "../controllers/upload/UploadVideo/UploadVideoController";

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

const uploadRoutes = Router();

uploadRoutes.post(
	"/image",
	uploadImage.single("file"),
	uploadImageController.handle
);
uploadRoutes.post(
	"/video",
	uploadVideo.single("file"),
	uploadVideoController.handle
);

export default uploadRoutes;
