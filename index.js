const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()
// the middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
//app.use(morgan("tiny"))
app.use(morgan(':method :url :req :status :res[content-length] - :response-time ms'))
morgan.token('req', function (req, res) { return JSON.stringify( req.body ) })

const personsRouter = require('./controllers/persons')
app.use('/api/persons', personsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})