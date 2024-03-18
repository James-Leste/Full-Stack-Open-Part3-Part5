const express = require('express')
const app = express()
// enable .env
require('dotenv').config()
//enable cors
const cors = require('cors')
//enable logging
const morgan = require('morgan')
//database mode
const blogRouter = require('./controllers/blogController')
const usersRouter = require('./controllers/userController')


app.use(cors())
app.use(express.json())
app.use(blogRouter)
app.use(usersRouter)

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

module.exports = app