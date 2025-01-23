import { expect } from 'chai'
import request from 'supertest'
import app from '../../../../src/api/app.js'

console.log('Test file loaded successfully')

describe('GET, v1/weathers', () => {
    it('200', async () => {
        const res = await request(app).get('/v1/weathers').query('london').expect(200)
        expect(res.body).to.include.keys('city', 'country', 'forecast', 'temperature', 'time')
    })

    it('400, city - missing', async () => {
        const res = await request(app)
            .post('/v1/weathers')
            .send({
                country: 'CZ',
                temperature: -200,
                forecast: 'cloudy',
                time: '2024-10-01T01:11:19Z'
            })
            .expect(400)
        expect(res.body).to.deep.equal({
            messages: ['city: must be a string', 'city: is required', 'city: must be between 2 and 25 characters long']
        })
    })

    it('400, city - incorrect format', async () => {
        const res = await request(app)
            .post('/v1/weathers')
            .send({
                city: 5,
                country: 'CZ',
                temperature: -200,
                forecast: 'cloudy',
                time: '2024-10-01T01:11:19Z'
            })
            .expect(400)
        expect(res.body).to.deep.equal({ messages: ['city: must be a string'] })
    })

    it('422, city - out of range', async () => {
        const res = await request(app)
            .post('/v1/weathers')
            .send({
                city: 't',
                country: 'CZ',
                temperature: -200,
                forecast: 'cloudy',
                time: '2024-10-01T01:11:19Z'
            })
            .expect(400)

        expect(res.body).to.deep.equal({
            messages: ['city: must be between 2 and 25 characters long']
        })
    })
})
