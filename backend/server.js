//////////////////////////////
// DEPENDENCIES
////////////////////////////////

require('dotenv').config()

//db connection import occurs after dotenv so module can access process.env object with populated key/value pairs
require('./config/database')

const { PORT } = process.env

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const plantRouter = require('./routes/plant')
const animalRouter = require('./routes/animal')
const birdRouter = require('./routes/bird')
///////////////////////////////
// APP CONFIG
////////////////////////////////

const app = express()

///////////////////////////////
// MIDDLEWARE
////////////////////////////////

// mount express urlencoded - body parser - x-www-urlencoded data (process data from form submission)

app.use(express.urlencoded({extended: true}))
// mount express JSON body parser
app.use(express.json()) // look for a request 'Content-Type' - 'application/json' -> req.body ({...} or [{...}, {...}])

// handling CROSS ORIGIN RESOURCE requests - prevents errors on our MERN stack 
app.use(cors())
// mount cors() -> cross origin request middleware
app.use(morgan('dev'))


///////////////////////////////
// ROUTER MIDDELWARE
////////////////////////////////
app.use('/bird', birdRouter)
app.use('/animal', animalRouter)
app.use('/plant', plantRouter)
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
///////////////////////////////
// SERVER 
////////////////////////////////

app.listen(PORT, ()=>console.log(`Listening on port: ${PORT}`))