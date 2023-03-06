import { Request, Response } from "express";

export class Ping {
    handle(req: Request, res: Response) {
        res.json({
            message: "Olá, mundo!"
        });
    }
}
