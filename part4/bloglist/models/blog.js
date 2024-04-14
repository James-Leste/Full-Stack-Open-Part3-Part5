const mongoose = require('mongoose')
const config = require("../utils/config")

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log(`connected to MongoDB: ${url}`)
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


//Delete _id and __v attribute of GET from database
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    },
    virtuals: true
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog



