import { Router } from "express";
import { getWeather, getCityWeather } from "../controllers/weather_contollers.js";

export const WeatherRouter = Router()

//   GET /weather?city={cityName}
WeatherRouter.get('/', getWeather)

// GET /weather/:city
WeatherRouter.get('/:city', getCityWeather)