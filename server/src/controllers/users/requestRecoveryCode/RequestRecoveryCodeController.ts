import { Response } from "express";
import { RequestBody } from "../../../utils/RequestBody";
import { AppError } from "../../../errors/AppError";

import { RecoveryCodeProps, RequestRecoveryCodeUseCase } from "./RequestRecoveryCodeUseCase";

export class RequestRecoveryCodeController {
    async handle(req: RequestBody<RecoveryCodeProps>, res: Response) {
        const email = req.body?.email?.trim();
        console.log(req.body);
        if (!email)
            throw new AppError("empty_fields", 400);

        const requestRecoveryCodeUseCase = new RequestRecoveryCodeUseCase();
        const response = await requestRecoveryCodeUseCase.execute({ email });

        if (!response)
            throw new AppError("internal_server_error", 500);

        res.status(200);
    }
}
