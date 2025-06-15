import axios from "axios"
import { Weather } from "../models/weather_models.js"


const normalizeCity = (city) => city.trim().toLowerCase();

const getWeatherFromAPI = async (city) => {
    const { WEATHER_API_KEY, BASE_URL } = process.env;


    const response = await axios.get(BASE_URL, {
        params: {
            key: WEATHER_API_KEY,
            q: city,
        }
    });
    return response.data;
};

export const getWeather = async (req, res) => {
    const city = normalizeCity(req.query.city);

    if (!city) return res.status(400).json({ error: 'City name must be provided' });

    try {
        let weather = await Weather.findOne({ city });

        if (weather) {
            return res.json({ source: 'my database', data: weather });
        }

        const apiData = await getWeatherFromAPI(city);

        const newWeather = new Weather({
            city,
            temperature: apiData.current.temp_c,
            weatherDescription: apiData.current.condition.text,
            timestamp: new Date(apiData.current.last_updated)
        });

        await newWeather.save();
        res.json({ source: 'External api', data: newWeather });
    } catch (error) {
        console.error('Fetch error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Cannot fetch weather information' });
    }
};
// fetching weather information from database

export const getCityWeather = async (req, res) => {
    const city = normalizeCity(req.params.city);

    try {
        const weather = await Weather.findOne({ city });
        if (!weather) return res.status(404).json({ error: 'City cannot be found in our database' });
        res.json(weather);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};