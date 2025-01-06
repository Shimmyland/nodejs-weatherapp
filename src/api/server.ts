import { logger } from '../utils/logger.js'
import app from './app.js'
import env from '../config/default.js'
import initDatabase from '../database/init.js'

app.listen(env.port, async () => {
    await initDatabase()
    logger.info(`Server is running on ${env.port}.`)
})