import { Request, Response } from "express";

export class UploadVideoController {
	async handle(req: Request, res: Response) {
		console.log(req.file);
	}
}
