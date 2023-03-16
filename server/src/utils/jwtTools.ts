import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { SECRET } from "./secret";
import { AppError } from "../errors/AppError";

// TODO: Terminar de aprender a utilizar o JWT
export function check(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"] as string | null;

    if (!token)
        throw new AppError("invalid_token");

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err)
            throw new AppError("invalid_token", 401);
        
        // FIXME: arrumar e tentar fazer a verificação de token
        req.id = decoded.id;
        next();
    });
}
