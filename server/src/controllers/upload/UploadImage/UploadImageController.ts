import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";

import { AppError } from "../../../errors/AppError";

import { prisma } from "../../../prisma/client";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import jwt, { JwtPayload } from "jsonwebtoken";
dayjs.locale(ptBr)

const secret = process.env.JWT_SECRET as string;

export class UploadImageController {
    async handle(req: RequestBody<{ file: any }>, res: Response) {
        console.log("Upload de imagem")
        const userToken = jwt.verify(req.headers.authorization ?? "", secret);

        if (!req.file || !userToken) throw new AppError("invalid_media");

        const fullUrl = req.protocol.concat("://").concat(req.hostname);
        const fileUrl = new URL(
            `/uploads/${req.file.filename}`,
            fullUrl
        ).toString();

        // res.json({
        //     url: fileUrl,
        // });

        // Inserindo foto no banco de dados
        let date = dayjs(new Date()).format("D[ de ]MMMM[, ]YYYY[ - ]hh[:]mm");
        console.log(date);
        console.log(req.file.filename)
        let response = await prisma.translation.create({
            data: {
                image_name: req.file.filename,
                title: `Captura de ${date}`,
                authorId: (userToken as JwtPayload).id
            }
        })

        res.status(201).send()
    }
}
