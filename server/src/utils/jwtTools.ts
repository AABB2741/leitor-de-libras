import jwt from "jsonwebtoken";

import { Request } from "express";
import { SECRET } from "./secret";
import { AppError } from "../errors/AppError";

export function check(req: Request) {
    const token = req.headers["x-access-token"];

    
}
