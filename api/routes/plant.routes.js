import express from "express"
import { deletePlant, getPlants, getUsersPlants, postPlant } from "../controller/plant.controller.js";
import { authenticateUser } from "../middlewares/verifyToken.js";
const api = process.env.API_URL;

const router = express.Router()

router.get(`${api}/plants`,authenticateUser, getPlants)
router.get(`${api}/plants/:userName`, getUsersPlants)
router.delete(`${api}/plants/`, deletePlant)
router.post(`${api}/plants`, postPlant)

export default router