import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";
import path from "path";

import multer from "multer";
import { AppError } from "../../../errors/AppError";
const parser = multer({
    storage: multer.diskStorage({
        destination: "public/uploads",
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            const newFilename = file.fieldname + "-" + Date.now() + extension;
            cb(null, newFilename);
        },
    }),
}).single("image");


export class UploadImageController {
    async handle(req: RequestBody<{}>, res: Response) {
        console.log("Requisição de upload de imagem");

        parser(req, res, (err) => {
            console.log(err);
            if (err || !req.file) {
                throw new AppError("internal_server_error", 500);
            }

            const image = {
                id: req.file.filename,
                url: `/uploads/${req.file.filename}`,
            };

            console.log("Retornando imagem: " + JSON.stringify(image));
            res.status(200).json({
                url: image.url,
            });
        });
    }
}
