const jwt = require('jsonwebtoken')
const Post = require("../models/postSchema")
const bcrypt = require("bcrypt")
const userSchema = require('../models/userSchema')







const addPost = async (req, res) => {

    try {
        const newpost = await Post.create(req.body)

        res.status(200).json(newpost)
    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}

const updatePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        if (req.body.userId && post.userId == req.body.userId) {
            const newpost = await Post.findByIdAndUpdate(id, req.body)

            const updatedPost = await Post.findById(newpost._id)

            res.status(200).json(updatedPost)
        } else {
            res.status(400).json({ "message": "you can't update others posts " })
        }

    } catch (error) {
        res.status(400).json({ "message": error.message })
        res.status(400).json({ "message": "error occurd" })
    }
}

const deletePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        if (req.body.userId && post.userId == req.body.userId) {
            await Post.findByIdAndDelete(id)

            res.status(200).json({ "message": "post deleted" })
        } else {
            res.status(400).json({ "message": "you can't delete others posts " })
        }

    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}

const togglelikeePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })

            res.status(200).json({ "message": "post liked" })
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })

            res.status(200).json({ "message": "removed  like from post" })
        }

    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}

const getPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        res.status(200).json({ post })
    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}

const gettimelinePost = async (req, res) => {
    try {
        const crrentUser = await userSchema.findById(req.body.userId)
        const userPosts = await Post.find({ userId: req.body.userId })
        const friendPosts = await Promise.all(crrentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res


        res.status(200).json({ posts: userPosts.concat(...friendPosts) })
    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}



module.exports = { addPost, updatePost, deletePost, togglelikeePost, getPost, gettimelinePost }