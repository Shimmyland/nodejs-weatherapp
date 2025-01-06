import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerParser from '@apidevtools/swagger-parser'
import errorHandler from './middleware/error-handling.js'
import { logger, loggerHttp } from '../utils/logger.js'
import routes from './routes/v1.js'

const app = express()

// async/await / IIFE / Top-Level await
try {
    const swaggerDocument = await swaggerParser.bundle('./docs/swagger.yaml')
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            supportedSubmitMethods: []
        }
    }))
    logger.info('Swagger documentation loaded successfully.')
} catch (error) {
    logger.error(`Error loading Swagger documentation: ${error}`)
}

app.use(loggerHttp)
app.use(express.json())
app.use('/v1/weathers', routes)
app.use(errorHandler)

export default app