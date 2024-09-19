import { sendVerificationMail, sendMail } from "../utils/mail.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const user = await User.find()

        res.send(user)
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = (req, res) => {
    const user = new User({
        name: req.body.name,
        mail: req.body.mail,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10)
    })

    if (req.body.name == "" || req.body.mail == "" || req.body.passwordHash == "") {
        return res.status(400).json({ errorMessage: "Rellena los formularios" })
    }

    user.save()
        .then(createdUser => {
            res.status(200).json(createdUser)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

export const loginUser = async (req, res) => {
    const { password, mail } = req.body;

    try {
        const searchedUser = await User.findOne({ mail });

        if (!searchedUser) {
            return res.status(400).json({ errorMessage: "El mail no es correcto." });
        }

        if (searchedUser && bcrypt.compareSync(password, searchedUser.passwordHash)) {
            const code = Math.random().toString(36).substring(2, 6).toUpperCase();
            const expiration = Date.now() + 10 * 60 * 1000; // 10 minutos

            searchedUser.verificationCode = code;
            searchedUser.verificationCodeExpires = expiration;

            await searchedUser.save();

            sendVerificationMail(mail, code);
            res.json("Te enviamos un codigo de verificación")
        } else {
            return res.status(400).json({ errorMessage: "La contraseña parece no ser correcta." })
        }
    } catch (error) {
        console.log(error)
    }
}

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_KEY,
        { expiresIn: '4w' }
    );
};

export const verifyCode = async (req, res) => {
    const { mail, code } = req.body;

    try {
        const searchedUser = await User.findOne({ mail });

        if (!searchedUser) {
            return res.status(404).json({ errorMessage: "Usuario no encontrado." });
        }

        if (Date.now() > searchedUser.verificationCodeExpires) {
            return res.status(400).json({ errorMessage: "El código de verificación ha expirado." });
        }

        if (searchedUser.verificationCode !== code) {
            return res.status(400).json({ errorMessage: "El código de verificación es incorrecto." });
        }

        const token = generateToken(searchedUser);

        searchedUser.verificationCode = null;
        searchedUser.verificationCodeExpires = null;
        await searchedUser.save();
        
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30
        });
        
        

        return res.status(200).json({ errorMessage: "Código verificado con éxito!", token });

    } catch (error) {
        console.error("Error verificando el código:", error);
        return res.status(500).json({ errorMessage: "Error del servidor. Intente nuevamente más tarde." });
    }
};