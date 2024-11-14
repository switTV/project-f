import express from "express"
import multer from "multer";
import { deletePlant, getPlants, getUsersPlants, postPlant, postPlantImage, getPlantPhoto, getPlantById } from "../controller/plant.controller.js";
import { authenticateUser } from "../middlewares/verifyToken.js";

const upload = multer({
    dest: "api/uploads/"
})

const api = process.env.API_URL;

const router = express.Router()

router.get(`${api}/plants`, getPlants);                   // Obtiene todas las plantas
router.get(`${api}/plants/user/:userId`, getUsersPlants);  // Obtiene plantas de un usuario específico
router.get(`${api}/plants/:plantId`, getPlantById);        // Obtiene una planta por ID
router.delete(`${api}/plants/`, deletePlant);              // Elimina una planta
router.post(`${api}/plants`, postPlant);                   // Crea una nueva planta


router.get(`${api}/garden`, authenticateUser, (req, res) => {
    res.json({
        message: 'Acceso permitido',
        user: req.user // El payload del token decodificado
    });
})

router.post(`${api}/plants/capturePlant`,authenticateUser ,upload.single("imagenPlanta") ,postPlantImage)
router.get(`${api}/plantPhoto/:plantPhotoId`, authenticateUser, getPlantPhoto)

export default router