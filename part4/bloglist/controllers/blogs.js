const blogsRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')


blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error.message))
})

blogsRouter.post('/', async (request, response, next) => {
  const data = request.body
  const likes = data.likes || 0
  const user = await User.findById(data.id)
  data.likes = likes
  data.user = data.id
  const blog = new Blog(data)

  if (!data.title || !data.url || !data.author) {
    response.status(400).end()
  }

  try{
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    console.log("controller ln30", result)
    response.status(201).json(result)
  } catch (exception) {
    next(exception.message)
  }
})

module.exports = blogsRouter
