import jwt from "jsonwebtoken"

export const authenticateUser = (req, res, next) => {
    const authToken = req.headers.authorization
    const token = authToken.split(" ")[1]

    if (!token) {
        return res.status(403).json({ errorMessage: "NO SE ENCUENTRA TOKEN" })
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        req.user = verified
        next();
    } catch (error) {
        return res.status(403).json({ errorMessage: "pon un token válido." })
    }
}