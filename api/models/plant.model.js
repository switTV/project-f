import mongoose from "mongoose"
import { Schema } from "mongoose"

const plantSchema = new Schema({
    imageUrl: {
        type: String,  // Aquí guardaremos la ruta de la imagen
        // required: true,
    },
    imageFilename: {
        type: String,  // Aquí guardaremos la ruta de la imagen
        // required: true,
    },
    nombre_comun: {
        type: String,
        // required: true,
    },
    descripcion: {
        type: String,
        // required: true,
    },
    cuidados_especiales: {
        type: Array,
        // required: true,
    },
    plagas: {
        type: Array,
        // required: true,
    },
    nativas: {
        type: Array,
        // required: true
    },
    floracion: {
        type: String,
        // required: true,
    }
})

export const Plant = mongoose.model("Plant", plantSchema)