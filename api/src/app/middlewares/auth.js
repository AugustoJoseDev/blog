const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send({ error: 'No token provided' })
    }

    if (!/^Bearer [\w+/-]+\.[\w+/-]+\.[\w+/-]+$/i.test(authorization)) {
        return res.status(401).send({ error: 'Malformatted token', authorization })
    }

    const [ , token ] = authorization.split(' ')

    jwt.verify(token, authConfig.secret, async (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' })

        const userId = decoded.id

        if (!await User.exists({ _id: userId })) {
            return res.status(401).send({ error: 'This user does not exists' })
        }

        req.auth = { userId }

        next()

    })

}
