const express = require('express')
const authMiddleware = require('../middlewares/auth')
const Post = require('../models/Post')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author')

        return res.status(200).json({ posts })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id).populate('author')

        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }
        return res.status(200).json({ post })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

// ########## AUTHORIZATION REQUIRED ##########
router.use(authMiddleware)

router.post('/', async (req, res) => {
    try {
        const { userId } = req.auth

        const data = req.body

        delete data._id
        delete data.createdAt
        delete data.updatedAt

        data.author = userId

        const post = new Post(data)

        try {
            await post.validate()
        } catch (err) {
            return res.status(400).json({ error: `${ err }` })
        }

        await post.save()

        return res.status(201).json({ post })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { userId } = req.auth
        const { id } = req.params
        const data = req.body

        const post = await Post.findById(id).populate('author')

        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }

        if (post.author._id != userId) {
            return res.status(403).json({ error: 'This user does not have sufficient permission to perform this action' })
        }

        delete data._id
        delete data.createdAt
        delete data.updatedAt
        delete data.author

        post.set(data)

        try {
            await post.validate()
        } catch (err) {
            return res.status(400).json({ error: `${ err }` })
        }

        await post.save()

        return res.status(200).json({ post })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

router.delete('/:id', async (req, res) => {
    const { userId } = req.auth

    try {
        const { id } = req.params

        const post = await Post.findById(id)

        if (!post) {
            return res.status(404).json({ error: 'Post not found' })
        }

        if (post.author != userId) {
            return res.status(403).json({ error: 'This user does not have sufficient permission to perform this action' })
        }

        await post.deleteOne()

        return res.status(200).json({ post })
    } catch (err) {
        console.warn(err)
        return res.status(400).json({ error: 'Unexpected error occurred' })
    }
})

module.exports = app => app.use('/post', router)
