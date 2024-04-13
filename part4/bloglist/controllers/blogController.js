const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})


blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    if (!Object.keys(request.body).includes('url') || !Object.keys(request.body).includes('title')) {
        response.status(400).end()
    } else {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        console.log(decodedToken)
        const user = await request.user
        //const user = await User.findById(body.user)
        console.log(user)
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

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blogId = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const userId = decodedToken.id
    logger.info(userId)
    logger.info(blogId)
    const blog = await Blog.findById(blogId)
    logger.info(blog)
    if (userId !== blog.user.toString()) {
        response.status(401).json({ error: 'token invalid for this user' }).end()
    } else {
        const result = await Blog.findOneAndDelete({ _id: blogId })
        if (result) {
            response.json(result)
        } else {
            response.status(404).end()
        }
    }


})

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
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