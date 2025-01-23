import { expect } from 'chai'
import request from 'supertest'
import app from '../../../../src/api/app.js'

console.log('Test file loaded successfully - 2 ')

describe('POST, v1/weathers, Runtime', () => {
    it('201', async () => {
        const res = await request(app)
            .post('/v1/weathers')
            .send({
                city: 'Prague',
                country: 'CZ',
                temperature: -200,
                forecast: 'cloudy',
                time: '2024-10-01T01:11:19Z'
            })
            .expect(201)
        expect(res.body).to.equal({ message: 'Weather has been created.' })

        // expect(res.status).to.equal(400)
        //expect(res.body).to.matchSnapshot()
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
