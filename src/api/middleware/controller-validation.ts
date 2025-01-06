import { Request, Response, NextFunction } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import { ValidationError } from '../../utils/errors.js'

function responseToValidationError(req:Request, res:Response, next:NextFunction) {
    if (!validationResult(req).isEmpty()) {
        const errorMessages:string[] = validationResult(req).array().map((err:any) => `${err.path}: ${err.msg}`)
        if (errorMessages.some(msg => msg.includes('greater') || msg.includes('future'))) {
            next(new ValidationError(errorMessages, 422))
        } if (errorMessages.some(msg => msg.includes('between')) && errorMessages.length <= 1) {
            next(new ValidationError(errorMessages, 422))
        } else {
            next(new ValidationError(errorMessages))
        }
    }
    next()
}


const city = [
    query('city')
        .trim().notEmpty().withMessage('is required')
        .isString().withMessage('must be a string')
        .isLength({min: 3, max: 20}).withMessage('must be between 3 and 25 characters long')
        .custom((value) => {
            if (Array.isArray(value)) return false
            return true
        }).withMessage('only one city (value) is allowed'),
    responseToValidationError
]

const id = [
    param('id')
        .trim().notEmpty().withMessage('is required')
        .isInt().withMessage('must be a number'),
    responseToValidationError
]

const pagination = [
    query('page')
        .optional()
        .custom((value) => {
            if (value !== undefined) {
                if (!Number.isInteger(Number(value))) throw new Error('must be a number')
                if (Number(value) < 1) throw new Error('must be a number greater than 1')
            }
            return true
        }),
    query('limit')
        .optional()
        .custom((value) => {
            if (value !== undefined) {
                if (!Number.isInteger(Number(value))) throw new Error('must be a number')
                if (Number(value) < 1 || Number(value) > 100) throw new Error('must be between 1 and 100')
            }
            return true
        }),
        //.isInt().withMessage('must be a number')
        //.isInt({min:1, max:100}).withMessage('must be between 1 and 100'),
    responseToValidationError
]

const reqBody = [
    body('*').custom((value) => {
        if (Array.isArray(value) || typeof value === 'object') return false
        return true
    }).withMessage('should not be an array or object'),
    body('city')
        .trim().notEmpty().withMessage('is required')
        .isString().withMessage('must be a string')
        .not().matches(/\d/).withMessage('cannot contain numbers'),
    body('country')
        .trim().notEmpty().withMessage('is required')
        .isString().withMessage('must be a string')
        .not().matches(/\d/).withMessage('cannot contain numbers'),
    body('temperature')
        .trim().notEmpty().withMessage('is required')
        .isFloat().withMessage('must be a number')
        .isFloat({min: -432.67, max: 212}).withMessage('must be between -432.67°F and 212°F'),
    body('forecast')
        .trim().notEmpty().withMessage('is required')
        .isString().withMessage('must be a string')
        .not().matches(/\d/).withMessage('cannot contain numbers'),
    body('time')
        .trim().notEmpty().withMessage('is required')
        .isISO8601().withMessage('invalid format (ISO8601)')
        .custom((value) => {
            if (new Date(value) > new Date()) return false
            return true
          }).withMessage('cannot be in the future'),
    responseToValidationError
]

const optionalBody = [
    body('*').custom((value, { path }) => {
        if (Array.isArray(value) || typeof value === 'object') return false
        return true
    }).withMessage('should not be an array or object'),
    body('city')
        .optional().isString().withMessage('must be a string')
        .not().matches(/\d/).withMessage('cannot contain numbers'),
    body('country')
        .optional().isString().withMessage('must be a string')
        .not().matches(/\d/).withMessage('cannot contain numbers'),
    body('temperature')
        .optional()
        .isFloat().withMessage('must be a number')
        .isFloat({min: -432.67, max: 212}).withMessage('must be between -432.67°F and 212°F'),
    body('forecast')
        .optional().isString().withMessage('must be a string')
        .not().matches(/\d/).withMessage('cannot contain numbers'),
    body('time')
        .optional().isISO8601().withMessage('invalid format (ISO8601)'),
    responseToValidationError
]


export default {
    pagination,
    city,
    id,
    reqBody,
    optionalBody,
}


/*
import { Ajv } from 'ajv'
import { ValidationError } from '../../utils/errors.js'
import { WeatherDtoSchema } from '../validations/schema/v1/weather.js'
import { id, city, pagination } from '../validations/schema/common.js'
import { ValidatorResult } from 'jsonschema'
//import {addFormats} from 'ajv-formats'

const ajv = new Ajv({ allErrors : true })

ajv.compile(WeatherDtoSchema)
ajv.compile(id)
ajv.compile(city)
ajv.compile(pagination)

//addFormats(ajv)



export function validateBody(body: any) {
    const validationResult = ajv.validate(WeatherDtoSchema, body)

    if (!validationResult) {
        const errors: string[] = validationResult.errors.map((err: any) => err.stack)
        throw new ValidationError(errors)
    }
    return body
}

export function validateBody(body: any) {
    const validationResult = ajv.validate('WeatherDtoSchema', body)

    if (!validationResult) {
        const errors: string[] = validationResult.errors.map((err: any) => err.stack)
        throw new ValidationError(errors)
    }
    return body
}
    */