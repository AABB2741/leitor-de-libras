import jwt, { JwtPayload } from "jsonwebtoken";
const secret = process.env.JWT_TOKEN as string;

function verify(token: string) {
    if (typeof token !== "string")
        throw new TypeError("Token inserido não é do tipo string");

    jwt.verify(token, secret, (err, decoded) => {
        console.log("Responsa:");
        console.log(decoded);
        console.log("Err:");
        console.log(err);
    });
}

function sign(payload: JwtPayload) {

}

export {
    verify,
    sign
};
