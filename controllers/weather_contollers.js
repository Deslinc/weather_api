import axios from "axios"
import { Weather } from "../models/weather_models.js"


const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const normalizeCity = city => city.trim().toLowerCase();

export const getWeather = async (req, res) => {
    const cityParam = req.query.city;
    if (!cityParam) return res.status(400).json({ error: "city name must be provided" });
    const city = normalizeCity(cityParam);

    try {
        let weather = await Weather.findOne({ city });

        if (weather) {
            return res.json({ source: 'database', data: weather });
        }
        // fetching data from external API
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'

            }
        });

        const data = response.data;
        const newWeather = new Weather({
            city,
            temperature: data.main.temp,
            description: data.weather[0].description
        });

        await newWeather.save();
        return res.json({ source: 'api', data: newWeather });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
};

export const getWeatherByCityParam = async (req, res) => {
    const city = normalizeCity(req.params.city);

    try {
        const weather = await Weather.findOne({ city });
        if (!weather) return res.status(404).json({ error: 'City not found' });

        res.json(weather);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }

}; 
