const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authRouter = require('express').Router()
const User = require('../models/user')

authRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    const user = await User.findOne({ username: username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    //create token
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    //use "SECRET" to sign the token
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name, id: user.id })
})

module.exports = authRouter