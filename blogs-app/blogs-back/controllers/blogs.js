const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })

  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({
        error: 'content missinng'
      })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(blog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({
        error: exception.message
      })
    } else {
      console.log(exception)
      response.status(500).json({
        error: 'something went wrong...'
      })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  } catch (exception) {
    response.status(400).send({
      error: 'malformatted id'
    })
  }
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.url
  }

  try {
    const replacedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, {
        new: true
      })
    response.json(Blog.format(replacedBlog))
  } catch (exception) {
    response.status(400).send({
      error: 'malformatted id'
    })
  }

})

module.exports = blogsRouter