const mongoose = require('mongoose')
require('dotenv').config()

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds133044.mlab.com:33044/persons`
mongoose.connect(url)

const args = process.argv;
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema);

if(args[2] && args[3]) {
  const person = new Person({
    name: args[2],
    number: args[3]
  })

  console.log(`lisätään henkilö ${person.name} numero ${person.number} luetteloon`)

  person
    .save()
    .then(result => {
      console.log('person saved!')
      mongoose.connection.close()
    })
}else {
  Person
  .find({})
  .then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
