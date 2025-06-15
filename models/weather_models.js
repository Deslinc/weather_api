import {Schema, model, trusted} from "mongoose";


const WeatherSchema = new Schema({
    city: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    temperature: {
        type: Number
    },
    weatherDescription: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

}, {timestamps: true})

export const Weather = model('weather', WeatherSchema);