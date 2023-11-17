const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../model/blog')


usersRouter.post('/', async (request, response, next) => {
    const {username, name, password} = request.body

    if (!username || !password) {
        return response.status(400).json({
            status: 'error',
            message: 'Username and password must be given'
        })
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json(
            'Username and password length must be greater than 3 characters'
        )
    }

    try {
        const users = await User.find({username: username})
        console.log("controller users", users)
        const existingUser = users.find(user => user.username === username)
        console.log("controller users2 ", existingUser)
        if (existingUser) {
          return response.status(400).json("expected username to be unique")
        }
    } catch (exception) {
        next(exception)
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)


    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch(exception) {
        next(exception)
    }

})


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter
