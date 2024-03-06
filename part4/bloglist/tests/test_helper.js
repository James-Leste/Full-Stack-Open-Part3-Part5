const Blog = require('../models/blog')

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

const insertTemBlog = async () => {
    const blog = new Blog(newBlog)
    await blog.save()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    newBlog,
    newBlogWithNoLike,
    newBlogWithNoTitle,
    newBlogWithNoURL,
    initialBlogs,
    blogsInDb,
    insertTemBlog
}