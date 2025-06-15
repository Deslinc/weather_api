import express from "express"
import { WeatherRouter } from "./routes/weather_routes.js"
import mongoose from "mongoose"
import "dotenv/config"
import cors from "cors"

const app = express()

const mongouri = process.env.MONGO_URI
mongoose.connect(mongouri)

const PORT = process.env.PORT || 9000

await mongoose.connect(mongouri)




app.use(express.json())

app.use(cors())

app.use( '/weather', WeatherRouter)


app.listen(PORT, () =>{
    console.log(`server is up on port ${PORT}`)
})