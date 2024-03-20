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

const login = async () => {
    const token = await api.post('/api/login').send({ username: 'James', password: '123456' })
    return token
}

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("deleted blogs")
    await User.deleteMany({})
    console.log("deleted Users")

    for (let item of helper.initialUser) {
        const { _id, username, name, password } = item
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            _id,
            username,
            name,
            passwordHash,
        })
        await user.save()
        console.log("users saved")
    }

    // for (let item of helper.initialBlogs) {
    //     let blog = Blog(item)
    //     await blog.save()
    //     console.log('blogs saved')
    // }

    console.log("done")
})

test('dummy test', async () => {
    assert(1)
})

test('user blog list works correctly', async () => {
    const token = await login()
    const response = await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
        .send(helper.blogPostByJames)
        .expect(201)
    console.log("blog by James saved")
    const userList = await helper.usersInDb()
    const blogList = await helper.blogsInDb()
    // console.log(userList)
    // console.log(blogList)
    assert.strictEqual(userList[0].blog[0].toString(), blogList[0].id)
})

test('get blog post populate user detail', async () => {
    const token = await login()
    await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
        .send(helper.blogPostByJames)
    console.log("blog by James saved")
    const users = await helper.usersInDb()
    const response = await api.get('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
    const getResult = response.body[0].user

    console.log(users[0].id)
    console.log(getResult.id)
    assert.deepStrictEqual(users[0].id, getResult.id)
})

test('blogs are returned as json', async () => {
    const token = await login()
    await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

// test('blogs number', async () => {
//     const body = await helper.blogsInDb()
//     assert.strictEqual(body.length, helper.initialBlogs.length)
// })


test('post new', async () => {
    const token = await login()

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
        .send(helper.newBlog)
    const body = await helper.blogsInDb()
    assert.strictEqual(body.length, 1)
})

test('post has id', async () => {
    const body = await helper.blogsInDb()
    for (let item of body) {
        assert(Object.keys(item).includes('id'))
    }
})

test('no like equals 0', async () => {
    const token = await login()
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
        .send(helper.newBlogWithNoLike)
    const body = await helper.blogsInDb()
    assert.strictEqual(body[0].likes, 0)
})

test('no url or title return 400 bad request', async () => {
    const token = await login()
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
        .send(helper.newBlogWithNoTitle)
        .expect(400)
    console.log("done")
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token.body.token}`)
        .send(helper.newBlogWithNoURL)
        .expect(400)
})

test('delete test', async () => {
    const token = await login()
    await helper.insertTemBlog()
    const result = await api.delete('/api/blogs/65e82e2142a6654094096d9f')
        .set('Authorization', `Bearer ${token.body.token}`)
    assert.deepStrictEqual(result.body.id, helper.newBlog._id)
})

test('update blog', async () => {
    const token = await login()
    const updatedBlog = {
        "title" : "new",
        "author": "ziqiwang",
        "url": "www.example.com",
        "likes": 1
    }
    await helper.insertTemBlog()
    const result = await api
                        .put('/api/blogs/65e82e2142a6654094096d9f')
                        .set('Authorization', `Bearer ${token.body.token}`)
                        .send(updatedBlog)
    assert.strictEqual(result.body.title, updatedBlog.title)

})

after(async () => {
    await mongoose.connection.close()
})