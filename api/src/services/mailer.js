const nodemailer = require('nodemailer')
const mailerConfig = require('../config/mailer.json')

const transport = nodemailer.createTransport(mailerConfig)

module.exports = transport