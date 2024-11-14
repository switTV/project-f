import express from "express"
import mongoose from  "mongoose"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";


import cors from 'cors';

import authJwt from "./utils/jwt.js"

import userRoutes from "./routes/user.routes.js"
import plantRoutes from "./routes/plant.routes.js"

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
app.use(authJwt());
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// routes
app.use(userRoutes)
app.use(plantRoutes)
app.use('/api/uploads', express.static('uploads'));



mongoose.connect(process.env.MONGO_STRING, {
    dbName: 'cluster1'
})
.then(() => {
    console.log("DB connection ready!")
})
.catch((err) => {
    console.log(err)
})

app.listen(port, () => {console.log("server initialized!")})