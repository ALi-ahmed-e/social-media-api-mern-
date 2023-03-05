const jwt = require('jsonwebtoken')
const User = require("../models/userSchema")
const bcrypt = require("bcrypt")






const register = async (req, res) => {

    const { name, email } = req.body
    const entredpassword = req.body.password

    try {

        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400).json({ "message": 'user already exists' })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(entredpassword, salt)


            const user = await User.create({
                name: name,
                email: email,
                password: hashedPassword,
                profileImage: `https://ui-avatars.com/api/?background=random&name=${name}&format=png`
            })

            const { password, ...other } = user._doc
            res.status(200).json({ ...other, token: generateToken(user._id), })
        }
    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {


            const { password, ...other } = user._doc
            res.status(200).json({ ...other, token: generateToken(user._id), })

        } else {
            res.status(400).json({ "message": "wrong email or password" })
        }
    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}



const updateUser = async (req, res) => {
    const { password, name, profileImage, coverImage } = req.body
    const id = req.params.id


    try {
        if (id) {

            const user = await User.findById(id)


            if (password) {

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                const updatedUser = await User.findByIdAndUpdate(id, {
                    name,
                    hashedPassword,
                    profileImage,
                    coverImage
                })
                const { password, ...other } = updatedUser._doc
                res.status(200).json({ ...other, token: generateToken(user._id), })
            } else {
                await User.findByIdAndUpdate(id, req.body)
                const updatedUser = await User.findById(id)
                const { password, ...other } = updatedUser._doc
                res.status(200).json({ ...other, token: generateToken(user._id), })
            }
        } else {
            res.status(400).json({ "message": "user id needed" })
        }
    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}


const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id)
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

        if (id !== req.body.userId) {

            const user = await User.findById(id)
            const currentuser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentuser.updateOne({ $push: { following: id } })
                res.status(200).json({ "message": "user followed" })
            } else {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentuser.updateOne({ $pull: { following: id } })
                res.status(200).json({ "message": "user unfollowed" })
            }
        } else {
            res.status(403).json({ "message": "you cant follow yourself" })
        }


    } catch (error) {
        res.status(400).json({ "message": "error occurd" })
    }
}



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = { register, login, updateUser, deleteUser, getUser, togglefollowUser }