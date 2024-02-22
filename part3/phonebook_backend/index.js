const express = require('express')
const app = express()
app.use(express.json())



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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})