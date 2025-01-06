import { logger } from '../utils/logger.js'
import sequelize from './database.js'
import { WeatherModel } from './models/Weather.js'
import { seedForDB } from './seeds/test-data.js'
import globals from './../config/globals.js'

export default async function initDatabase() {
    try {
        await sequelize.authenticate()
        logger.info('DB: Connected to database.')

        await WeatherModel.sync({ force: false })
        logger.info('DB: Models have been synchronized.')

        if (await WeatherModel.count() === 0) {
            await WeatherModel.bulkCreate(seedForDB)
            logger.info('DB: Test data has been inserted.')
        }
        globals.dbConnected = true
    } catch(err) {
        logger.error(`DB: Unable to connect to the database: ${err}`)
        logger.warn('DB: Data are used from seed and available only during runtime!')
    }
}