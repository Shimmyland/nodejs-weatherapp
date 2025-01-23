import { Sequelize } from 'sequelize'
import env from '../config/default.js'
import { logger } from '../utils/logger.js'

if (!env.host || !env.username || !env.password || !env.database) {
    throw new Error('Database configuration is incomplete.')
}

export default new Sequelize({
    dialect: 'postgres',
    host: env.host,
    port: 5432,
    username: env.username,
    password: env.password,
    database: env.database,
    logging: (msg) => logger.info(msg)
})
