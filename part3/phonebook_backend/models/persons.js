const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        minLength: 3
    },
    number: String,
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', phonebookSchema)

module.exports = Person

// if (process.argv.length === 3) {
//     Person.find({}).then(result => {
//         result.forEach(note => {
//             console.log('%c [ note ]-33', 'font-size:13px; background:pink; color:#bf2c9f;', typeof (note))

//             console.log(note)
//         })
//         mongoose.connection.close()
//     })
// } else if (process.argv.length == 5) {
//     const name = process.argv[3]
//     const number = process.argv[4]
//     const person = new Person({
//         id: crypto.randomUUID(),
//         name: name,
//         number: number
//     })

//     person.save().then(result => {
//         console.log(`added ${name} number ${number} to phonebook`)

//     })
// } else {
//     mongoose.connection.close()
// }




