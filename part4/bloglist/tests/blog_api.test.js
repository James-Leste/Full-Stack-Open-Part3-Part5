const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const newBlog = {
    title: "New Item",
    author: "Ziqi Wang",
    url: "https://james-leste.github.io",
    likes: 2,
}

const newBlogWithNoLike = {
    title: "Another New Item",
    author: "Ziqi Wang",
    url: "https://james-leste.github.io",
}

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log("deleted")

    for (let item of initialBlogs) {
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
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('post new', async () => {
    await api
        .post('/api/blogs')
        .send(newBlog)
    const response = await api.get('/api/blogs')
    
    
    assert.strictEqual(response.body.length, 5)
})

test('post has id', async () => {
    const response = await api.get('/api/blogs')
    for (let item of response.body) {
        assert(Object.keys(item).includes('id'))
    }
})

test('no like equals 0', async () => {
    await api
        .post('/api/blogs')
        .send(newBlogWithNoLike)
    const response = await api.get('/api/blogs')
    console.log('%c [ response ]-96', 'font-size:13px; background:pink; color:#bf2c9f;', response.body[4])
    assert.strictEqual(response.body[4].likes, 0)
})

after(async () => {
    await mongoose.connection.close()
})