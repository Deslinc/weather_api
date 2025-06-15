import { Router } from "express";
import { getWeather, getWeatherByCityParam } from "../controllers/weather_contollers.js";

export const WeatherRouter = Router()

//   GET /weather?city={cityName}
WeatherRouter.get('/', getWeather)

// GET /weather/:city
WeatherRouter.get('/:city', getWeatherByCityParam)