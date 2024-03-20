const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    if (!Object.keys(request.body).includes('url') || !Object.keys(request.body).includes('title')) {
        response.status(400).end()
    } else {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        //const user = await User.findById(body.user)
        const blog = new Blog({
            _id: body._id === undefined ? new mongoose.Types.ObjectId() : body._id,
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })
        logger.info(request.body)
        const result = await blog.save()
        logger.info(user)
        user.blog = user.blog.concat(result._id)
        await user.save()
        response.status(201).json(result)
    }
})

blogRouter.delete('/:id', async (request, response) => {
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

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    const result = await Blog.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true })
    if (result) {
        response.json(result)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter