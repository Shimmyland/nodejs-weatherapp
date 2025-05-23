import { Sequelize } from 'sequelize'
import env from '../config/default.js'
import { logger } from '../utils/logger.js'

/*
Singleton via Object Literal - modules are cached (they run once and then are reused)!
Thus, it acts as a Singleton, even though you don't manually enforce the Singleton pattern inside the code — modules guarantee it.
*/
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

/*
class PostgreSQLConnection {
    private static instance: Sequelize

    private constructor(){}

    public static getInstance(): Sequelize {
        if (!PostgreSQLConnection.instance) {
            if (!env.host || !env.username || !env.password || !env.database) {
                throw new Error('Database configuration is incomplete.')
            }
            PostgreSQLConnection.instance = new Sequelize({
                dialect: 'postgres',
                host: env.host,
                pool: {
                    max: 10,
                    min: 2,
                    idle: 10000,
                },
                port: 5432,
                username: env.username,
                password: env.password,
                database: env.database,
                logging: (msg) => logger.info(msg)
            })
        }
        return PostgreSQLConnection.instance
    }
}

export default PostgreSQLConnection.getInstance()
*/