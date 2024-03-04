const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log(`connected to MongoDB: ${url}`)
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

// const phonebookSchema = new mongoose.Schema({
//     id: String,
//     name: {
//         type: String,
//         minLength: 3
//     },
//     number: {
//         type: String,
//         minLength: 8,
//         validate: {
//             validator: v => {
//                 return /^\d{2,3}-\d{5,}$/.test(v)
//             }
//         }
//     },
// })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog



