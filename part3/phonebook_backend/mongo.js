const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]

const url =
    `mongodb+srv://admin:${password}@cluster0.3hadh79.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)



const phonebookSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log('%c [ note ]-33', 'font-size:13px; background:pink; color:#bf2c9f;', typeof (note))

            console.log(note)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length == 5){
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({
        id: crypto.randomUUID(),
        name: name,
        number: number
    })

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        
    })
} else {
    mongoose.connection.close()
}




