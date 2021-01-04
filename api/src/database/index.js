const mongoose = require('mongoose')

const { host, dbname } = require('../config/database.json')

mongoose.connect(
    `mongodb://${ host }/${ dbname }`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (err) {
            console.error('Unable to connect to the database.')
            process.exit(1)
        } else {
            console.log('Successfully connected to the database.')
        }
    }
)

mongoose.Promise = global.Promise

module.exports = mongoose

