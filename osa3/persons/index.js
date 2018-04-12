const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})