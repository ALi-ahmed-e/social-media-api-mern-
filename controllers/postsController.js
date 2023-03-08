const Post = require("../models/postSchema")
const userSchema = require('../models/userSchema')







const addPost = async (req, res) => {

    try {
        const newpost = await Post.create({ ...req.body, user: req.user._id })

        res.status(200).json(newpost)
    } catch (error) {
        res.status(400).json({ "message": error.message })
        // res.status(400).json({ "message": "error occurd" })
    }
}

const updatePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        if (req.user && post.user && req.user._id.toString() == post.user.toString()) {
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
        if (req.user && post.user && req.user._id.toString() == post.user.toString()) {
            await Post.findByIdAndDelete(id)

            res.status(200).json({ "message": "post deleted" })
        } else {
            res.status(400).json({ "message": "you can't delete others posts " })
        }

    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}

const commentPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)
        // const comment = {
        //     user: req.user._id,
        //     comment: req.body.comment
        //     username:req.user.username,
        //     userImage: req.body.userImage,
        //     time:Date.now(),
        // }
        const comment = {
            user: req.user._id,
            comment: req.body.comment,
        }

        // await post.updateOne({ $push: { comments: comment } })
        post.comments.push(comment)
        post.save()
        res.status(200).json({ "message": post })


    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

const deletecommentPost = async (req, res) => {
    const id = req.params.id
    const commentid = req.params.cmtid

    try {
        const post = await Post.findById(id)

        post.comments.splice(post.comments.findIndex(cmnt => cmnt._id == commentid), 1)
        post.save()
        res.status(200).json({ "message": post })


    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

const togglelikeePost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await Post.findById(id)

        if (!post.likes.includes(req.user._id.toString())) {
            await post.updateOne({ $push: { likes: req.user._id.toString() } })

            res.status(200).json({ "message": "post liked" })
        } else {
            await post.updateOne({ $pull: { likes: req.user._id.toString() } })

            res.status(200).json({ "message": "removed  like from post" })
        }

    } catch (error) {
        res.status(400).json({ "message": error.message })
        res.status(400).json({ "message": "error occurd" })
    }
}

const getPost = async (req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.findById({ _id })
        res.status(200).json({ post })
    } catch (error) {
        res.status(400).json({ "message": error.message })
        res.status(400).json({ "message": "error occurd" })
    }
}

const gettimelinePost = async (req, res) => {
    try {
        const crrentUser = await userSchema.findById(req.user._id.toString())
        const userPosts = await Post.find({ user: req.user._id.toString() })

        const friendPosts = await Promise.all(crrentUser.Following.map((friendId) => {
            return Post.find({ user: friendId });
        })
        );

        const allPosts = userPosts.concat(...friendPosts)
        res.status(200).json(allPosts)


    } catch (error) {
        res.status(400).json({ "message": error.message })
        res.status(400).json({ "message": "error occurd" })
    }
}



module.exports = { addPost, updatePost, deletePost, togglelikeePost, getPost, gettimelinePost, commentPost, deletecommentPost, }