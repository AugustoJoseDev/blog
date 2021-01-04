const { Schema, model, Types } = require('../../database')

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date
    },
    updatedAt: {
        type: Date
    }
}, { versionKey: false })

PostSchema.pre('save', async function (next) {
    this.updatedAt = new Date()
    next()
})

const Post = model('Post', PostSchema)

module.exports = Post