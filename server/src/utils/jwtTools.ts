import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;

function verify(token: string): Promise<[jwt.VerifyErrors | null, JwtPayload | string | undefined]> {
    return new Promise(resolve => {
        jwt.verify(token, secret, (err, decoded) => {
            resolve([err, decoded]);
        });
    });
}

function sign(id: string, expiresIn: number = 60 * 60 /* 1 hora */) {
    return jwt.sign(
        { id },
        secret,
        { expiresIn }
    );
}

export {
    verify,
    sign
};
