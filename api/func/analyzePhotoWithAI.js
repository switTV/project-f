import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs"
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
    model: "gemini-pro-vision",
    model: "gemini-1.5-pro",
    systemInstruction: "You are an aplication that provides info about flowers and plants",
    generationConfig: { responseMimeType: "application/json" }
})

function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"), //convirtiendo la imagen a algo que la IA comprenda
        mimeType
      }
    }
}

export async function analyzeImageWithAI(photoPath, photoMimeType) {
    const prompt = process.env.INFO_PROMPT;
	const token = process.env.BEARER_TOKEN;
    const imageParts = [fileToGenerativePart(photoPath, photoMimeType)];

    console.log(`Examinando la imagen`);


    try {
        const result = await model.generateContent([prompt, ...imageParts]);

        const responseContent = result.response.candidates[0].content.parts[0].text; // AI text
        const plantData = JSON.parse(responseContent);
        console.log(plantData)

        const validatedPlantData = {
            nombre_comun: plantData.nombre_comun || "Desconocido",
            descripcion: plantData.descripción || "Sin descripción",
            cuidados_especiales: plantData.cuidados_especiales || [],
            plagas: plantData.plagas || [],
            nativas: plantData.nativas || [],
            floracion: plantData.floracion || "Sin información",
        };
      
        console.log('Planta publicada exitosamente:', validatedPlantData);

  	} catch (error) {
    	console.error('Error:', error.message || error);
  	}
}