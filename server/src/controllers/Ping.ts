import { Request, Response } from "express";

export class Ping implements Controller {
    handle(req: Request, res: Response) {
        res.json({
            message: "Olá, mundo!"
        });
    }
}
