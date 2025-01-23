import { DataTypes, Model } from 'sequelize'
import sequelize from '../database.js'

export interface Weather {
    id: number
    city: string
    country: string
    temperature: number
    forecast: string
    time: Date
}

export class WeatherModel extends Model {}

WeatherModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        temperature: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        forecast: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Weather',
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
        /*scopes: {
        plain: {
            raw: true
        }
    }*/
    }
)
