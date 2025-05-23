import { pino, Logger } from 'pino'
import { pinoHttp } from 'pino-http'
import fs from 'fs'

// Singleton via Object Literal - modules are cached (they run once and then are reused)!

export const logger = pino({
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname'
                }
            },
            {
                target: 'pino-pretty',
                options: {
                    destination: './app.log',
                    colorize: false,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname'
                }
            }
        ]
    }
})

fs.appendFileSync('./app.log', '\n')
logger.info('Server has started.')

export const loggerHttp = pinoHttp({
    logger,
    customLogLevel: (res: any, err: any) => {
        if (res.statusCode >= 500) return 'error'
        if (res.statusCode >= 400) return 'warn'
        return 'info'
    },
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            query: req.query,
            params: req.params
        }),
        res: (res) => ({
            statusCode: res.statusCode,
            responseTime: res.responseTime
        }),
        err: (err) => ({
            message: err.message
        })
    }
})

/*
class Pino {
    private static loggerInstance: Logger
    private static httpLoggerInstance: ReturnType<typeof pinoHttp>

    private constructor() {}

    public static getLoggerInstance(): Logger {
        if (!Pino.loggerInstance) {
            Pino.loggerInstance = pino({
                transport: {
                    targets: [
                        {
                            target: 'pino-pretty',
                            options: {
                                colorize: true,
                                translateTime: 'SYS:standard',
                                ignore: 'pid,hostname'
                            }
                        },
                        {
                            target: 'pino-pretty',
                            options: {
                                destination: './app.log',
                                colorize: false,
                                translateTime: 'SYS:standard',
                                ignore: 'pid,hostname'
                            }
                        }
                    ]
                }
            })
            fs.appendFileSync('./app.log', '\n')
            Pino.loggerInstance.info('Logger initialized.')
        }
        return Pino.loggerInstance
    }

    public static getHttpLoggerInstance(): ReturnType<typeof pinoHttp> {
        if (!this.httpLoggerInstance) {
            Pino.httpLoggerInstance = pinoHttp({
                logger: Pino.getLoggerInstance(),
                customLogLevel: (res: any, err: any) => {
                    if (res.statusCode >= 500) return 'error'
                    if (res.statusCode >= 400) return 'warn'
                    return 'info'
                },
                serializers: {
                    req: (req) => ({
                        method: req.method,
                        url: req.url,
                        query: req.query,
                        params: req.params
                    }),
                    res: (res) => ({
                        statusCode: res.statusCode,
                        responseTime: res.responseTime
                    }),
                    err: (err) => ({
                        message: err.message
                    })
                }
            })
        }
        return Pino.httpLoggerInstance
    }
}

export const logger = Pino.getLoggerInstance()
export const loggerHttp = Pino.getHttpLoggerInstance()
*/