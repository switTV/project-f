import jwt from "jsonwebtoken"

export const authenticateUser = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        res.status(403).json({ errorMessage: "wiu wiu, no puede pasar aqui señor" })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        req.user = verified
        next();    
    } catch (error) {
        res.status(403).json({ errorMessage: "pon un token válido mama guevazo" })
    }
}