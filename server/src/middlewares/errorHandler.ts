import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { Prisma } from "@prisma/client";

export default function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof AppError) {
		res.status(err.status).json({
			status: "error",
			code: err.code,
		});
	} else if (err instanceof ZodError) {
		res.status(400).send();
	} else if (err instanceof JsonWebTokenError) {
		res.status(401).send();
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		console.log("Deu um erro " + err.code);
		switch (err.code) {
			case "P2025": // Not found
				res.status(404).send();
				break;
			default:
				res.status(500).send();
		}
	} else {
		console.error(`Ocorreu um erro: ${err}`);
		res.status(500).send();
	}
}
