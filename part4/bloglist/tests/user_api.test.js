const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("deleted blogs")
    await User.deleteMany({})
    console.log("deleted Users")

    for (let item of helper.initialUser) {
        await api.post('/api/users').send(item)
        console.log("users saved")
    }

    console.log("done")
})

test('get users', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, helper.initialUser.length)
})


test('user with short password should not pass', async () => {
    await api.post('/api/users')
        .send(helper.userWithShortPassword)
        .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})
