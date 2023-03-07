import { Request, Response } from "express";

export class LoginController {
    async handle(req: Request, res: Response) {
        res.json({
            message: "Login"
        })
    }
}
