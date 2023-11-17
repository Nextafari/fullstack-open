const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)


test('there are two objects', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})


describe('testing blog', () => {
    test('test blog creation without likes attrs', async () => {
        const newBlog = {
            "title": "Do more expect little.",
            "author": "Mark Dwanye",
            "url": "http://localhost:3001/api/persons/654439ba19dfe87abd53097f"
            // "likes": 3
        }
       const response = await api.post('/api/blogs').send(newBlog)

       expect(response.body.likes).toBe(0)
    })

    test('blog title and url properties missing throws a 400', async () => {
        const newBlog = {
            "author": "Mark Dwanye",
            "likes": 3
        }
        const response = await api.post('/api/blogs').send(newBlog)

        expect(response.statusCode).toBe(400)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})
