const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("deleted blogs")
    await User.deleteMany({})
    console.log("deleted Users")

    for (let item of helper.initialUser) {
        let user = new User(item)
        await user.save()
        console.log("users saved")
    }

    // await new Blog(helper.blogPostByJames).save()
    // console.log("blog by James saved")
    // await new Blog(helper.blogPostByYoona).save()
    // console.log("blog by Yoona saved")

    console.log("done")
})

test('users number', async () => {
    const body = await helper.usersInDb()
    assert.strictEqual(body.length, helper.initialUser.length)
})

test('user blog list works correctly', async () => {
    await api.post('/api/blogs')
        .send(helper.blogPostByJames)
        .expect(201) 
    console.log("blog by James saved")
    const userList = await helper.usersInDb()
    const blogList = await helper.blogsInDb()
    assert.strictEqual(userList[0].blog[0].toString(), blogList[0].id)
})

after(async () => {
    await mongoose.connection.close()
})
