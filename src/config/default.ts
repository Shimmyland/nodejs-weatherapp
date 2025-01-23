import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'test'}` })

export default Object.freeze({
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY || null,
    host: process.env.POSTGRES_HOST || null,
    username: process.env.POSTGRES_USERNAME || null,
    password: process.env.POSTGRES_PASSWORD || null,
    database: process.env.POSTGRES_DATABASE || null
})