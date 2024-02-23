const express = require('express')

const morgan = require('morgan')
const cors = require('cors')
const Person = require("./models/persons.js")

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


//morgan logging config
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

//get all persons
app.get("/api/persons", (request, response) => {
    Person.find({}).then(result => {
        response.json(result)
    })
})

// app.get("/info", (request, response) => {
//     const length = info.length
//     response.send(`
//         <p>Phonebook has info for ${length} people</p>
//         <p>${Date(Date.now())}</p>
//         `)
// })

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    Person.find({ id: id }).then(result => {
        if (result.length != 0) {
            response.json(result[0])
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    Person.findOneAndDelete({ id: id }).then(result => {
        if (result){
            response.json(result)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
    let person = request.body
    if (!Object.hasOwn(person, "name")) {
        //console.log('%c [ person ]-68', 'font-size:13px; background:pink; color:#bf2c9f;', person)
        response.json({ error: 'No name attribute' }).status(400).end()
    } else {
        const uuid = crypto.randomUUID()
        //console.log('%c [ uuid ]-66', 'font-size:13px; background:pink; color:#bf2c9f;', uuid)
        person = { id: uuid, ...person }
        new Person(person).save().then(result => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            response.json(person)
        })
    }
})

app.put("/api/persons/:id", (request, response) => {
    const person = request.body
    const id = request.params.id
    Person.findOneAndUpdate({id: id}, person).then(result => {
        if (result) {
            response.json({id: id, ...person})
        } else {
            response.status(404).end()
        }
    })
})

// errorHandling midware
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})