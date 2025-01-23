export class CustomError extends Error {
    // Error atributes = name, message, stack + statusCode, isOperational?
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        //Error.captureStackTrace(this, this.constructor)
    }
}

export class ValidationError extends CustomError {
    messages: string[]
    constructor(messages: string[], statusCode: number = 400) {
        super(messages[0], statusCode)
        this.messages = messages
    }
}

export class ApiError extends CustomError {
    originalMessage: string
    constructor(originalMessage: string, message: string, statusCode: number = 500) {
        super(message, statusCode)
        this.originalMessage = originalMessage
    }
}
