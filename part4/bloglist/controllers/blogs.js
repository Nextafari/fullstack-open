const blogsRouter = require('express').Router()
const Blog = require('../model/blog')


blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error.message))
})

blogsRouter.post('/', (request, response, next) => {
  const data = request.body
  const likes = data.likes || 0
  data.likes = likes
  const blog = new Blog(data)

  if (!data.title || !data.url || !data.author) {
    response.status(400).end()
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error.message))
})

module.exports = blogsRouter
