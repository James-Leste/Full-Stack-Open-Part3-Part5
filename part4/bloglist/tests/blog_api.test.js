const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("deleted")

    for (let item of helper.initialBlogs) {
        let blog = new Blog(item)
        await blog.save()
        console.log("saved")
    }
    console.log("done")
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs number', async () => {
    const body = await helper.blogsInDb()
    assert.strictEqual(body.length, helper.initialBlogs.length)
})

test('post new', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
    const body = await helper.blogsInDb()
    assert.strictEqual(body.length, 5)
})

test('post has id', async () => {
    const body = await helper.blogsInDb()
    for (let item of body) {
        assert(Object.keys(item).includes('id'))
    }
})

test('no like equals 0', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlogWithNoLike)
    const body = await helper.blogsInDb()
    assert.strictEqual(body[4].likes, 0)
})

test('no url or title return 400 bad request', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlogWithNoTitle)
        .expect(400)
    console.log("done")
    await api
        .post('/api/blogs')
        .send(helper.newBlogWithNoURL)
        .expect(400)
})

test('delete test', async () => {
    await helper.insertTemBlog()
    const result = await api.delete('/api/blogs/65e82e2142a6654094096d9f')
    assert.deepStrictEqual(result.body.id, helper.newBlog._id)
})

test('update blog', async () => {
    const updatedBlog = {
        "title" : "new",
        "author": "ziqiwang",
        "url": "www.example.com",
        "likes": 1
    }
    await helper.insertTemBlog()
    const result = await api
                        .put('/api/blogs/65e82e2142a6654094096d9f')
                        .send(updatedBlog)
    assert.strictEqual(result.body.title, updatedBlog.title)
    
})

after(async () => {
    await mongoose.connection.close()
})