const Blog = require('../models/blog')
const User = require('../models/user')

const newBlog = {
    _id: "65e82e2142a6654094096d9f",
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

const newBlogWithNoTitle = {
    author: "Ziqi Wang",
    url: "https://james-leste.github.io",
    likes: 9
}

const newBlogWithNoURL = {
    title: "Another New Item",
    author: "Ziqi Wang",
    likes: 9
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

const initialUser = [
    {
        _id: "65f856046bb9bcdd5c2e97a6",
        username: "James",
        name: "Ziqi Wang",
        password: "123456",
        blog: []
    }
]

const blogPostByJames = {
    _id: "65e82e2142a6654094096d9f",
    title: "New Item",
    author: "Ziqi Wang",
    url: "https://james-leste.github.io",
    likes: 2,
    user: "65f856046bb9bcdd5c2e97a6"
}

const userWithShortPassword = {
    _id: "65f856046bb9bcdd5c2e97a5",
    username: "Short",
    name: "Shorty",
    password: "12",
    blog: []
}

const insertTemBlog = async () => {
    const blog = new Blog(newBlog)
    await blog.save()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    newBlog,
    newBlogWithNoLike,
    newBlogWithNoTitle,
    newBlogWithNoURL,
    initialBlogs,
    initialUser,
    blogPostByJames,
    userWithShortPassword,
    blogsInDb,
    insertTemBlog,
    usersInDb
}