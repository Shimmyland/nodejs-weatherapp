import { WeatherModel } from '../models/Weather.js'
import { WeatherDto } from '../models/Weather.dto.js'


export default Object.freeze({
    create: async (dto: Omit<WeatherDto, 'id'>) => await WeatherModel.create(dto),
    read: async(id:number) => {
        return await WeatherModel.findByPk(id)
    },
    readAll: async (limit:number, offset:number) => {
        return await WeatherModel.findAll({
          limit: limit,
          offset: offset,
          order: [['id', 'ASC']]
        })
    },
    update: async(id:number, dto: Omit<WeatherDto, 'id'>) => await WeatherModel.update(dto, {where: {id: id}}),
    updatePartial: async(id:number, dto: Partial<Omit<WeatherDto, 'id'>>) => await WeatherModel.update(dto, {where: {id: id}}),
    delete: async(id:number) => await WeatherModel.destroy({where: {id: id}})
})