import { Request, Response } from "express";

export class PingController {
    handle(req: Request, res: Response) {
        console.log("Pingando!");
        res.status(200).json({
            message: "Olá, mundo!"
        });
    }
}
