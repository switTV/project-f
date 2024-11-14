import { Plant } from "../models/plant.model.js";
import { User } from "../models/user.model.js";
import { analyzeImageWithAI } from "../func/analyzePhotoWithAI.js";


export const getPlants = async(req, res) => {
    const plant = await Plant.find()

    res.send(plant)
}

export const getUsersPlants = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('userPlants');

        if (!user) {
            return res.status(404).json({ errorMessage: 'User not found' });
        }

        res.status(200).json(user.userPlants);
    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
}
export const getPlantById = async(req, res) => {
    try {
        const plant = await Plant.findById(req.params.plantId)

        if(!plant) {
            return res.status(404).json({ errorMessage: 'Plant not found' });
        }

        return res.status(200).json(plant)
    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }
} 

export const postPlant = async (req, res) => {
    try {
        const newPlant = new Plant({
            imageUrl: req.body.imageUrl,
            nombre_comun: req.body.nombre_comun,
            descripcion: req.body.descripcion,
            cuidados_especiales: req.body.cuidados_especiales,
            plagas: req.body.plagas,
            nativas: req.body.nativas,
            floracion: req.body.floracion,
        });

        const createdPlant = await newPlant.save();

        const searchedUser = await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { userPlants: createdPlant._id } },
            { new: true }
        );

        res.status(200).json({ createdPlant, searchedUser });
    } catch (err) {
        res.status(400).json(err);
    }
};

export const deletePlant = async (req, res) => {
    try {
        const plantId = req.body.plantId;
        const userId = req.body.userId;
  
        const plant = await Plant.findByIdAndDelete(plantId);
      
        if (!plant) {
            return res.status(404).json({ message: 'Plant not found' });
        }
  
        // Eliminar la referencia de la planta en el array userPlants del usuario
        const searchedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { userPlants: plantId } },
            { new: true }
        );
  
        if (!searchedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ message: 'Plant deleted and reference removed from user' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postPlantImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se ha subido ningún archivo' });
        }

        const { plantId } = req.body;

        if (!plantId) {
            return res.status(400).json({ message: 'plantId es requerido' });
        }

        const plantInfo = await analyzeImageWithAI(req.file.path, req.file.mimetype);

        const updatedPlant = await Plant.findByIdAndUpdate(
            plantId,
            { 
                imageUrl: req.file.path,
                imageFilename: req.file.filename,
                ...plantInfo,
            },
            { new: true }
        );

        if (!updatedPlant) {
            return res.status(404).json({ message: 'Planta no encontrada' });
        }

        res.status(200).json({
            message: 'Imagen cargada y guardada con éxito',
            plant: updatedPlant,
            fileInfo: {
                fieldname: req.file.fieldname,
                originalname: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size,
            },
        });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ message: 'Error al procesar la imagen', error: error.message });
    }
};

export const getPlantPhoto = async (req, res) => {
    const imagePath = `api/uploads/${req.params.plantPhotoId}`;

    // Verifica que imagePath no esté vacío
    if (!imagePath) {
        return res.status(500).json({ message: 'AAAAAAAAAAAAAAAAAAAAAAAAAA' });
    }

    try {
        res.sendFile(imagePath, { root: '.' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al procesar la imagen', error: error });
    }
};
