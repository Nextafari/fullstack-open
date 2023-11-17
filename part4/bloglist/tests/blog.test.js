const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../model/user')
const helper = require('./test_helper')

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


describe('testing blog as a whole.', () => {
    test('test blog creation without likes attrs', async () => {
        const newBlog = {
            "title": "Do more expect little.",
            "author": "Mark Dwanye",
            "id": "6556a8d24bcabfeba0281396",
            "url": "http://localhost:3001/api/persons/654439ba19dfe87abd53097f"
            // "likes": 3
        }
       const response = await api.post('/api/blogs').send(newBlog)
       console.log("response line 36", response.body)

       expect(response.body.likes).toBe(0)
    })

    test('blog title and url properties missing throws a 400', async () => {
        const newBlog = {
            "author": "Mark Dwanye",
            "id": "6556a8d24bcabfeba0281396",
            "likes": 3
        }
        const response = await api.post('/api/blogs').send(newBlog)

        expect(response.statusCode).toBe(400)
    })
})


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'mluukkai',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }
    
        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test(
        'creation fails with proper statuscode and message if username is already taken',
        async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            }

            const result = await api.post('/api/users').send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(result.body.error).toContain('expected username to be unique')
        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtstart)
        }
    )

    test(
        'catch users with invalid username and password lengths',
        async () => {
            const newUser = {
                username: 'r',
                name: 'Superuser',
                password: 'sa',
            }

            const result = await api.post('/api/users').send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.text).toContain(
                'Username and password length must be greater than 3 characters'
            )
        }
    )
})


afterAll(async () => {
    await mongoose.connection.close()
})
