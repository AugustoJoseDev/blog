const { Schema, model } = require('../../database')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: /^\w{3,24}$/i
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    updatedAt: {
        type: Date
    }
}, { versionKey: false })

UserSchema.pre('save', async function (next) {
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
    }
    this.updatedAt = new Date()
    next()
})

const User = model('User', UserSchema)

module.exports = User