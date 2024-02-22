const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
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

let info = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => {
    response.json(info)
})

app.get("/info", (request, response) => {
    const length = info.length
    response.send(`
        <p>Phonebook has info for ${length} people</p>
        <p>${Date(Date.now())}</p>
        `)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = info.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.send("<h1>Not Found</h1>")
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = info.find(person => person.id === id)
    if (person) {
        info = info.filter(person => person.id != id)
        response.json(person)
    } else {
        response.send("<h1>Not Found</h1>")
        response.status(404).end()
    }
})

app.post("/api/persons", (request, response) => {
    let person = request.body
    if (!Object.hasOwn(person, "name")) {
        //console.log('%c [ person ]-68', 'font-size:13px; background:pink; color:#bf2c9f;', person)
        response.json({ error: 'No name attribute' }).status(400).end()
    } else if (info.find(p => p.name === person.name)) {
        //console.log('%c [ person ]-68', 'font-size:13px; background:pink; color:#bf2c9f;', person)
        response.json({ error: 'name must be unique' }).status(400).end()
    } else {
        const uuid = crypto.randomUUID()
        //console.log('%c [ uuid ]-66', 'font-size:13px; background:pink; color:#bf2c9f;', uuid)
        person = { id: uuid, ...person }

        response.json(person)
    }

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})