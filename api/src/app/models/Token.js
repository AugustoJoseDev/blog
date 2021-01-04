const { Schema, model } = require('../../database')
const crypto = require('crypto')

const TokenSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    },
    token: {
        type: String,
        default: () => crypto.randomBytes(20).toString('hex')
    },
    updatedAt: {
        type: Date,
        default: new Date,
        expires: 3600 // 1 hour in seconds
    }
}, { versionKey: false })

TokenSchema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
})

const Token = model('Token', TokenSchema)

module.exports = Token