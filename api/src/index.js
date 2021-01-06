const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('./https')
const port = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    next()
})

require('./app/controllers')(app)

https(app).listen(port, () => {
    console.log(`Listenning on https://localhost:${ port }`)
})