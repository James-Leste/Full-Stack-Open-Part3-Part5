const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require("./models/persons.js")

const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

//morgan logging config
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req,res)
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

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
 Person.find({id:id}).then(result => {
        response.json(result[0])
    }).catch(error => {
        response.send(`<h1>${error}</h1>`)
        response.status(404).end()
    })
})

// app.delete("/api/persons/:id", (request, response) => {
//     const id = Number(request.params.id);
//     const person = info.find(person => person.id === id)
//     if (person) {
//         info = info.filter(person => person.id != id)
//         response.json(person)
//     } else {
//         response.send("<h1>Not Found</h1>")
//         response.status(404).end()
//     }
// })

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})