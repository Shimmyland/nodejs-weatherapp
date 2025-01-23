import { Router } from 'express'
import weatherController from '../controllers/v1/weathers.js'
import validate from '../middleware/controller-validation.js'

const router = Router()

router.get('', validate.city, weatherController.getWeather)
router.post('', validate.reqBody, weatherController.postWeather)
router.get('/list', validate.pagination, weatherController.getListOfWeathers)
router.get('/:id', validate.id, weatherController.getWeatherById)
router.put('/:id', validate.id, validate.reqBody, weatherController.putWeatherById)
router.patch('/:id', validate.id, validate.optionalBody, weatherController.patchWeatherById)
router.delete('/:id', validate.id, weatherController.deleteWeatherById)

export default router
