import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";
import { resolve } from "node:path"

import { AppError } from "../../../errors/AppError";
import multer from "multer";
import { z } from "zod";
import jwt from "jsonwebtoken"

import { prisma } from "../../../prisma/client";

const secret = process.env.JWT_SECRET as string

export class UploadImageController {
    async handle(req: RequestBody<{ file: any }>, res: Response) {

        if (!req.file)
            throw new AppError("invalid_media")

        const fullUrl = req.protocol.concat("://").concat(req.hostname)
        const fileUrl = new URL(`/uploads/${req.file.filename}`, fullUrl).toString()

        res.json({
            url: fileUrl
        })
    }
}
