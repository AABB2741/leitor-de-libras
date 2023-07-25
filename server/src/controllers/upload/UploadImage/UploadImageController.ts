import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";
import z from "zod";

import { AppError } from "../../../errors/AppError";

import { prisma } from "../../../prisma/client";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import jwt, { JwtPayload } from "jsonwebtoken";
dayjs.locale(ptBr);

const secret = process.env.JWT_SECRET as string;

export class UploadImageController {
    async handle(req: RequestBody<{ file: any }>, res: Response) {
        const userToken = jwt.verify(req.headers.authorization ?? "", secret);

        if (!req.file || !userToken) throw new AppError("invalid_media", 400);

        const user = await prisma.user.findUnique({
            where: {
                id: (userToken as JwtPayload).id,
            },
        });

        if (!user) throw new AppError("invalid_session", 401);

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

        let response = await prisma.translation.create({
            data: {
                imageName: req.file.filename,
                title: `Captura de ${date}`,
                authorId: (userToken as JwtPayload).id,
                type: "i"
            }
        });

        res.status(201).send(response);
    }
}
