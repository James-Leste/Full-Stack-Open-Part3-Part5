const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/api/blogs', async (request, response) => {
    if (!Object.keys(request.body).includes('url') || !Object.keys(request.body).includes('title')){
        response.status(400).end()
    } else {
        const blog = new Blog(request.body)
        logger.info(request.body)
        const result = await blog.save()
        response.status(201).json(result)
    }
})

blogRouter.delete('/api/blogs/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    logger.info(blog)
    const result = await Blog.findOneAndDelete({ _id: id })
    if (result) {
        response.json(result)
    } else {
        response.status(404).end()
    }
})

blogRouter.put('/api/blogs/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    const result = await Blog.findOneAndUpdate({_id : id}, body, { new: true, runValidators: true })
    if (result) {
        response.json(result)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter