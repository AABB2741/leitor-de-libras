import { Request, Response } from "express";

export class SignUp {
    handle(req: Request, res: Response) {
        const { body } = req;

        if (!body?.email || !body?.password) {
            return res.status(400).json({
                message: "Formato de login inválido"
            });
        }

        res.status(200).json({
            message: "Ok"
        });
    }
}
