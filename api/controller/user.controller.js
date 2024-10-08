import { sendVerificationMail, sendMail } from "../utils/mail.js";
import { validateEmail } from "../utils/mailValidator.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const user = await User.find()

        res.send(user)
    } catch (error) {
        console.error(error)
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params
    
    try {
        const user = await User.find({ _id: id })

        if(!user) {
            return res.status(404).json({ errorMessage: "Usuario no encontrado, no deberias estar viendo esto /;" });
        }

        res.send(user)
    } catch (err) {
        return res.status(500).json({ errorMessage: err.message });
    }
}

export const registerUser = async(req, res) => {
    try {
        //AUTH VERIFIER ------------------------------------------------------------------------------------------------------------
        if (req.body.name == "" || req.body.mail == "" || req.body.passwordHash == "") {
            return res.status(400).json({ errorMessage: "Rellena los formularios", errorType: "Global" })
        }
    
        else if (req.body.name.length < 2 || req.body.name.length >= 16) {
            return res.status(400).json({ errorMessage: "El nombre debe tener entre 2 y 16 caracteres.", errorType: "Name" })
        }
    
        else if (!validateEmail(req.body.mail)) {
            return res.status(400).json({ errorMessage: "Por favor, ingrese un mail valído.", errorType: "Mail" })
        }
    
        else if (req.body.passwordHash.length < 8) {
            return res.status(400).json({ errorMessage: "La contraseña debe tener mas de 8 caracteres", errorType: "Password" })
        }

        const existingUser = await User.findOne({ $or: [{ mail: req.body.mail }, { name: req.body.name }] });

        if (existingUser) {
            if (existingUser.mail === req.body.mail) {
                return res.status(400).json({ errorMessage: "El correo ya está en uso.", errorType: "Mail" });
            } else if (existingUser.name === req.body.name) {
                return res.status(400).json({ errorMessage: "El nombre ya está en uso.", errorType: "Name" });
            }
        }
        // -------------------------------------------------------------------------------------------------------------------------

        const user = new User({
            name: req.body.name,
            mail: req.body.mail,
            passwordHash: bcrypt.hashSync(req.body.passwordHash, 10)
        })
    
        user.save()
            .then(createdUser => {
                res.status(200).json(createdUser)
            })
            .catch((err) => {
                res.status(400).json(err)
            })
    } catch (err) {
        console.error(err)
    }
    
}

export const loginUser = async (req, res) => {
    const { password, mail } = req.body;

    try {
        const searchedUser = await User.findOne({ mail });

        if (!searchedUser) {
            return res.status(400).json({ errorMessage: "El mail no es correcto.", errorType: "Mail" });
        }

        if (searchedUser && bcrypt.compareSync(password, searchedUser.passwordHash)) {
            const code = Math.random().toString(36).substring(2, 6).toUpperCase();
            const expiration = Date.now() + 10 * 60 * 1000; // 10 minutos

            searchedUser.verificationCode = code;
            searchedUser.verificationCodeExpires = expiration;

            await searchedUser.save();

            sendVerificationMail(mail, code);
            res.json("Te enviamos un codigo de verificación.")
        } else {
            return res.status(400).json({ errorMessage: "La contraseña parece no ser correcta.", errorType: "Password" })
        }
    } catch (error) {
        console.error(error)
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
            if (searchedUser.wasLogged == false) {
                try {
                    await User.findByIdAndDelete(searchedUser._id);
                    return res.status(400).json({ errorMessage: "El código de verificación ha expirado, el usuario ha sido eliminado." });
                } catch (error) {
                    return res.status(500).json({ errorMessage: "Ocurrió un error al intentar eliminar el usuario." });
                }
            }
            else {
                return res.status(400).json({ errorMessage: "El código de verificación ha expirado, intentalo de nuevo." });
            }
        }

        if (searchedUser.verificationCode !== code.toUpperCase()) {
            return res.status(400).json({ errorMessage: "El código de verificación es incorrecto." });
        }

        const token = generateToken(searchedUser);

        searchedUser.verificationCode = null;
        searchedUser.verificationCodeExpires = null;
        searchedUser.wasLogged = true
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