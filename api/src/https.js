const https = require('https')
const path = require('path')
const fs = require('fs')

module.exports = app => (
    https.createServer({
        key: fs.readFileSync(path.resolve(process.env.SSL_KEY_FILE || 'server.key')),
        cert: fs.readFileSync(path.resolve(process.env.SSL_CRT_FILE || 'server.cert'))
    }, app)
)
