import { ApiError, CustomError } from '../utils/errors.js'
import { WeatherDto } from '../database/models/Weather.dto.js'
import env from '../config/default.js'
import globals from '../config/globals.js'
import got from 'got'
import { logger } from '../utils/logger.js'
import { runtimeData } from '../database/seeds/test-data.js'
import { Weather } from '../database/models/Weather.js'
import weatherRepo from '../database/repositories/weathers.js'

const BASE_URL:string = 'https://api.openweathermap.org/data/2.5/weather'

async function getWeatherById(id:number):Promise<Weather> {
    if (!globals.dbConnected) {
        const weather = runtimeData.find(w => w.id === id)
        if(!weather) throw new CustomError(`Weather not found.`, 404)
        return weather
    }

    const weather = await weatherRepo.read(id)
    if(!weather) throw new CustomError(`Weather not found.`, 404)
    return weather.get({ plain: true })
}

export default {
    getWeather: async(city:string):Promise<WeatherDto> => {
        if (!env.apiKey) throw new CustomError('API_KEY is requered, create or modify .env file. 🍺', 418)
        try {
            const response = await got(`${BASE_URL}?q=${city}&appid=${env.apiKey}`)
            const data = JSON.parse(response.body)
            return {
                city: data.name,
                country: data.sys.country,
                temperature: data.main.temp,
                forecast: data.weather[0].main,
                time: new Date
            }
        } catch (err:any) {
            if (err.response?.statusCode === 404) {
                throw new ApiError(err, 'Weather not found.', 404)
            }
            throw new ApiError(err, 'An unexpected error occurred on the server. Please try again later.', 500)
        }
    },
    postWeather: async(dto:WeatherDto):Promise<{}> => {
        if (!globals.dbConnected) {
            runtimeData.push({
                id: (runtimeData.at(-1)?.id ?? 0) + 1,
                city: dto.city,
                country: dto.country,
                temperature: dto.temperature,
                forecast: dto.forecast,
                time: dto.time
            })
        } else {
            await weatherRepo.create(dto)
        }
        return {message: 'Weather has been created.'}
    },
    getListOfWeathers: async(page:number, limit:number):Promise<Weather[]> => {
        const offset = (page - 1) * limit
        if (!globals.dbConnected) return runtimeData.slice(offset, offset + limit)
        
        const weathers = await weatherRepo.readAll(limit, offset)
        if (weathers.length === 0) throw new CustomError('Weather not found.', 404)
        return weathers.map(w => w.get({ plain: true }) as Weather)
    },
    getWeatherById: async(id:number):Promise<Weather> => {
        return getWeatherById(id)
    },
    putWeatherById: async(id:number, dto:WeatherDto):Promise<void> => {
        const recordToUpdate = await getWeatherById(id)

        if (!globals.dbConnected) {
            Object.assign(recordToUpdate, dto)
        } else {
            await weatherRepo.update(id, dto)
        }
        logger.info(`Weather record with id ${id} has been updated.`)
    },
    patchWeatherById: async(id:number, dto:Partial<WeatherDto>):Promise<void> => {
        if (!dto || Object.keys(dto).length === 0) throw new CustomError('No data provided for update', 422)
        const recordToUpdate = await getWeatherById(id)

        if (!globals.dbConnected) {
            Object.assign(recordToUpdate, dto)
        } else {
            await weatherRepo.updatePartial(id, dto)
        }
        
        logger.info(`Weather record with id ${id} has been updated.`)
    },
    deleteWeatherById: async(id:number):Promise<void> => {
        if (!globals.dbConnected) {
            const weatherIndex = runtimeData.findIndex(w => w.id === id)
            if (!weatherIndex) throw new Error('Weather not found')
            runtimeData.splice(weatherIndex, 1)
        } else {
            if (!await weatherRepo.read(id)) throw new CustomError(`Weather with id ${id} not found.`, 404)
            await weatherRepo.delete(id)
        }
        logger.info(`Weather record with id ${id} has been deleted.`)
    }
}