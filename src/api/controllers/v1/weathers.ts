import { Request, Response, NextFunction } from 'express'
import weatherOperations from '../../../operations/weathers.js'
import { serializeDto, serializePartialDto } from '../../../database/models/Weather.dto.js'
//import { validateBody } from '../../middleware/controller-validation.js'

export default {
    getWeather: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await weatherOperations.getWeather(req.query.city as string))
        } catch (err) {
            next(err)
        }
    },
    postWeather: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(201).json(await weatherOperations.postWeather(serializeDto(req.body)))
        } catch (err) {
            next(err)
        }
    },
    getListOfWeathers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = isNaN(parseInt(req.query.page as string, 10)) ? 1 : parseInt(req.query.page as string, 10)
            const limit = isNaN(parseInt(req.query.limit as string, 10)) ? 10 : parseInt(req.query.limit as string, 10)

            res.status(200).json(await weatherOperations.getListOfWeathers(page, limit))
        } catch (err) {
            next(err)
        }
    },
    getWeatherById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await weatherOperations.getWeatherById(parseInt(req.params.id)))
        } catch (err) {
            next(err)
        }
    },
    putWeatherById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(204).send(await weatherOperations.putWeatherById(parseInt(req.params.id), serializeDto(req.body)))
        } catch (err) {
            next(err)
        }
    },
    patchWeatherById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(204).send(await weatherOperations.patchWeatherById(parseInt(req.params.id), serializePartialDto(req.body)))
        } catch (err) {
            next(err)
        }
    },
    deleteWeatherById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(204).send(await weatherOperations.deleteWeatherById(parseInt(req.params.id)))
        } catch (err) {
            next(err)
        }
    }
}
