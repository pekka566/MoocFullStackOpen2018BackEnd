const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-12345467"
  },
  {
    id: 2,
    name: "Arto Tienari",
    number: "040-12345467"
  },
  {
    id: 3,
    name: "Arto Järvinen",
    number: "040-12345467"
  },
  {
    id: 4,
    name: "Arto Kutvonen",
    number: "040-12345467"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons);
})

app.get('/info', (req, res) => {
  res.send(`puhelinluettelossa ${persons.length} henkilön tiedot <br/> `
   + `${new Date()}`
  );
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  if (person.name === undefined || person.number === undefined) {
    return response.status(400).json({error: 'content missing'})
  }
  if (persons.find(p => p.name === person.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  person.id = Math.floor(Math.random() * 123456) + 1
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})