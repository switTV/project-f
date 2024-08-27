import { Plant } from "../models/plant.model.js";
import { User } from "../models/user.model.js";

export const getPlants = async(req, res) => {
    const plant = await Plant.find()

    res.send(plant)
}

export const getUsersPlants = async(req, res) => {
    try {
        const user = await User.findById(req.body.userId).populate('userPlants');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.userPlants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


export const postPlant = async (req, res) => {
    try {
        const newPlant = new Plant({
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