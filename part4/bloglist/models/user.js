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


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    blog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
    //virtuals: true
})

const User = mongoose.model('User', userSchema)

module.exports = User