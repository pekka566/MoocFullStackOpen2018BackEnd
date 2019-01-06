const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.formatPerson))
    })
    .catch(error => {
      console.log(error)
    })
})

personsRouter.get('/info', (req, res) => {
  Person
    .count()
    .then(count => {
      res.send(`puhelinluettelossa ${count} henkilön tiedot <br/> `
      + `${new Date()}`)
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'count failed!' })
    })
})

personsRouter.get('/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(Person.formatPerson(person))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

personsRouter.delete('/:id', (request, response) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

personsRouter.post('', (request, response) => {
  const person = request.body
  if (person.name === undefined || person.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const newPerson = new Person({
    name: person.name,
    number: person.number
  })

  Person
    .find({ name: person.name })
    .then(result => {
      console.log(result)
      if(result.length > 0) {
        response.status(400).send({ error: `${person.name} allready exists!` })
      }
      else {
        newPerson
          .save()
          .then(savedPerson => {
            response.json(Person.formatPerson(savedPerson))
          })
          .catch(error => {
            console.log(error)
            response.status(400).send({ error:  `error adding new person ${person} ` })
          })
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error:  `error checking person ${person} ` })
    })
})

personsRouter.put('/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, person, { new: true } )
    .then(updatedPerson => {
      response.json(Person.formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

module.exports = personsRouter