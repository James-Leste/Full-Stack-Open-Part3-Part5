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

module.exports = blogRouter