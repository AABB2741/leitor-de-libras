import { Request, Response } from "express";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        res.json({
            mensagem: "Criar usuário"
        })
    }
}
