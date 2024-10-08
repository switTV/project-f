import mongoose from "mongoose"
import { Schema } from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    userPlants: [{
        type: Schema.Types.ObjectId,
        ref: "Plant"
    }],
    mail: {
        type: String,
        unique: true,
        required: true,
        isEmail: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
    },
    verificationCodeExpires: {
        type: Number,
    },
    wasLogged: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
})

export const User = mongoose.model("user", userSchema)