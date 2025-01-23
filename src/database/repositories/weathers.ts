import { WeatherModel } from '../models/Weather.js'
import { WeatherDto } from '../models/Weather.dto.js'
import sequelize from '../database.js'

export default Object.freeze({
    create: async (dto: Omit<WeatherDto, 'id'>) => {
        const transaction = await sequelize.transaction()
        try {
            await WeatherModel.create(dto, { transaction })
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    },
    read: async (id: number) => {
        return await WeatherModel.findByPk(id)
    },
    readAll: async (limit: number, offset: number) => {
        return await WeatherModel.findAll({
            limit: limit,
            offset: offset,
            order: [['id', 'ASC']]
        })
    },
    update: async (id: number, dto: Omit<WeatherDto, 'id'>) => {
        const transaction = await sequelize.transaction()
        try {
            await WeatherModel.update(dto, { where: { id: id }, transaction })
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    },
    updatePartial: async (id: number, dto: Partial<Omit<WeatherDto, 'id'>>) => {
        const transaction = await sequelize.transaction()
        try {
            await WeatherModel.update(dto, { where: { id: id }, transaction })
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    },
    delete: async (id: number) => {
        const transaction = await sequelize.transaction()
        try {
            await WeatherModel.destroy({ where: { id: id }, transaction })
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
})
