import { sendVerificationMail } from "../utils/mail.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const getUsers = async(req, res) => {
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
        return res.status(400).json("Rellena los formularios")
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
            return res.status(400).json("El mail no es correcto.");
        }
    
        if (searchedUser && bcrypt.compareSync(password, searchedUser.passwordHash)) {
            const code = Math.random().toString(36).substring(2, 6).toUpperCase();
            const expiration = Date.now() + 10 * 60 * 1000; // 10 minutos

            searchedUser.verificationCode = code;
            searchedUser.verificationCodeExpires = expiration;
            
            await searchedUser.save();

            sendVerificationMail(mail, code);
            res.send("Te enviamos un codigo de verificación")
        } else {
            return res.status(400).json("La contraseña es incorrecta");
        }
    } catch (error) {
        console.log(error)
    }
}

export const verifyCode = async(req, res) => {
    const { mail, code } = req.body

    try {
        const searchedUser = await User.findOne({ mail });

        if (Date.now() > searchedUser.verificationCodeExpires) {
            return res.status(400).json({ message: "El código de verificación ha expirado." });
        }
        if (searchedUser.verificationCode !== code) {
            return res.status(400).json({ message: "El código de verificación es incorrecto." });
        }

        const token = jwt.sign(
            { id: searchedUser._id, isAdmin: searchedUser.isAdmin },
            process.env.JWT_KEY,
            { expiresIn: '4w' }
        );
        
        searchedUser.verificationCode = null;
        searchedUser.verificationCodeExpires = null;
        await searchedUser.save();

        return res.status(200).json({ message: "Código verificado con éxito!", token: token });
    } catch (error) {
        console.log(error)
    }
}