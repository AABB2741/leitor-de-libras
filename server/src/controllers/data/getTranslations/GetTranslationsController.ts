import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";
import z from "zod";

export class GetTranslationsController {
    async handle(req: RequestBody<null>, res: Response) {
        const paramsSchema = z.object({
            authorization: z.string()
        })

        console.log(req.headers)
        const { authorization } = paramsSchema.parse(req.headers);
        console.log(Authorization)
    }
}
