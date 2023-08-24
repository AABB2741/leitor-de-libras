import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

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
	} else {
		res.status(500).send();
	}
}
