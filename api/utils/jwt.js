import { expressjwt } from "express-jwt";

function authJwt() {
    const secret = process.env.JWT_KEY;
    const api = process.env.API_URL;

    console.log(process.env.API_URL)
    
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/`,
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/users/verifycode`,
        ]
    });
}

async function isRevoked(req, jwt) {
    return false;
}

export default authJwt;