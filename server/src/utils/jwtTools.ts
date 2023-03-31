import jwt, { JwtPayload } from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;

async function vverify(token: string) {
    if (typeof token !== "string")
        throw new TypeError("Token inserido não é do tipo string");

    const teste = await jwt.verify(token, "li-libras-server-jwt-secret", (err, decoded) => {
        console.log("Responsa:");
        console.log(decoded);
        console.log("Err:");
        console.log(err);
    });

    console.log("Teste:" + teste);
}

function verify(token: string): Promise<[jwt.VerifyErrors | null, jwt.JwtPayload | string | undefined]> {
    return new Promise(resolve => {
        jwt.verify(token, secret, (err, decoded) => {
            resolve([err, decoded]);
        });
    });
}

function sign(payload: JwtPayload) {

}

export {
    verify,
    sign
};
