import express from "express"
import { getUsers, loginUser, registerUser, verifyCode, getUser } from "../controller/user.controller.js"
const api = process.env.API_URL;

const router = express.Router()

router.get(`${api}/users`, getUsers)
router.get(`${api}/users/:id`, getUser)
router.post(`${api}/users/register`, registerUser)
router.post(`${api}/users/login`, loginUser)
router.post(`${api}/users/verifycode`, verifyCode)

export default router