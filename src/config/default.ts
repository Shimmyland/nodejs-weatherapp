import dotenv from 'dotenv'

dotenv.config()

export default Object.freeze({
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY || null,
    host: process.env.POSTGRES_HOST || 'localhost',
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'nodejs-weatherapp-db',
})