const express = require('express')
const bodyParser = require('body-parser')
const https = require('./https')
const cors = require('cors')
const morgan = require('morgan')
const port = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('dev'))

app.use((req, res, next) => {
    next()
})

require('./app/controllers')(app)

https(app).listen(port, () => {
    console.log(`Listenning on https://localhost:${ port }`)
})