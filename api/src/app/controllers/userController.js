const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Post = require('../models/Post')

const User = require('../models/User')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        return res.status(200).json({ users })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const filter = /^[0-9a-f]{24}$/i.test(id) ? { _id: id } : { username: id }

        const user = await User.findOne(filter)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const posts = await Post.find({ author: user._id })

        return res.status(200).json({ user, posts })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

// ########## AUTHORIZATION REQUIRED ##########
router.use(authMiddleware)

router.put('/:id', async (req, res) => {
    try {
        const { userId } = req.auth
        const { id } = req.params
        const data = req.body

        if (id != userId) {
            return res.status(403).json({ error: 'This user does not have sufficient permission to perform this action' })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        delete data._id
        delete data.createdAt
        delete data.updatedAt
        delete data.resetPasswordToken
        delete data.resetPasswordExpires
        delete data.email

        user.set(data)

        try {
            await user.validate()
        } catch (err) {
            return res.status(400).json({ error: `${ err }` })
        }

        await user.save()

        user.password = undefined

        return res.status(200).json({ user })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { userId } = req.auth
        const { id } = req.params

        if (id != userId) {
            return res.status(403).json({ error: 'This user does not have sufficient permission to perform this action' })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        await user.deleteOne()

        return res.status(200).json({ user })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

module.exports = app => app.use('/user', router)
