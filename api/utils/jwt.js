import { expressjwt } from "express-jwt";
import { User } from "../models/user.model.js";

function authJwt() {
    const secret = process.env.JWT_KEY;
    const api = process.env.API_URL;
    
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
            `${api}/uploads`,
        ]
    });
}

async function isRevoked(req, jwt) {
    const user = await User.findById(jwt.payload.id);
    if (!user || !user.wasLogged) {
        return true;
    }
    return false;
}

export default authJwt;