import express from "express"
import mongoose from  "mongoose"
import dotenv from "dotenv"

import authJwt from "./utils/jwt.js"

import userRoutes from "./routes/user.routes.js"
import plantRoutes from "./routes/plant.routes.js"

dotenv.config()

const app = express()
const port = 3000

app.use(express.json())
app.use(authJwt());

// routes
app.use(userRoutes)
app.use(plantRoutes)


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