const jwt = require('jsonwebtoken')
const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const postSchema = require('../models/postSchema')









const updateUser = async (req, res) => {
    const { thepassword} = req.body
    const id = req.user._id.toString()


    try {
        if (id) {
            if (thepassword) {

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(thepassword, salt)

                await User.findByIdAndUpdate(id, req.body)
                const updatedUser = await User.findByIdAndUpdate(id, {password:hashedPassword})
                const { password, ...other } = updatedUser._doc
                res.status(200).json(other)
            } else {
                await User.findByIdAndUpdate(id, req.body)
                const updatedUser = await User.findById(id)
                const { password, ...other } = updatedUser._doc

                res.status(200).json(other)
            }
        } else {
            res.status(400).json({ "message": "user id needed" })
        }
    } catch (error) {
        res.status(400).json({ "message": error.message })
        res.status(400).json({ "message": "error occurd" })
    }
}


const deleteUser = async (req, res) => {
    const id = req.user._id.toString();

    try {
        await User.findByIdAndDelete(id)
        await postSchema.deleteMany({user:id})
        res.status(200).json({ "message": "account successfuly deleted" })

    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}


const getUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json({ ...other })

    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}


const togglefollowUser = async (req, res) => {
    const id = req.params.id


    try {

        if (id !== req.user._id.toString()) {

            const user = await User.findById(id)
            const currentuser = await User.findById(req.user._id.toString())
            if (!user.Followers.includes(req.user._id.toString())) {
                await user.updateOne({ $push: { Followers: req.user._id.toString() } })
                await currentuser.updateOne({ $push: { Following: id } })
                res.status(200).json({ "message": "user followed" })
            } else {
                await user.updateOne({ $pull: { Followers: req.user._id.toString() } })
                await currentuser.updateOne({ $pull: { Following: id } })
                res.status(200).json({ "message": "user unfollowed" })
            }
        } else {
            res.status(403).json({ "message": "you cant follow yourself" })
        }


    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}


const searcUsers = async (req, res) => {
    const query = req.params.q

    try {
        if (query) {
            const users = await User.aggregate([
                {
                    $search: {
                        index: "default",
                        text: {
                            query: query,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ])

            res.status(200).json({ users })

        } else {
            res.status(400).json({ "message": "you have to add search query" })
        }

    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }


}

const getsugestedUsers = async (req, res) => {

    try {
        const users = await User.find({}).limit(2)
        res.status(200).json({ users })
    } catch (err) {
        res.status(400).json({ "message": err})
        res.status(400).json({ "message": "error occurd" })
    }

}


module.exports = {updateUser, deleteUser, getUser, togglefollowUser, searcUsers, getsugestedUsers }