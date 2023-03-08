const jwt = require('jsonwebtoken')
const User = require("../models/userSchema")
const bcrypt = require("bcrypt")






const register = async (req, res) => {

    const { username, email, phonenumber, profileImage } = req.body
    const entredpassword = req.body.password

    try {

        const userExists = await User.findOne({ email })
        if (userExists) {
            res.status(400).json({ "message": 'user already exists' })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(entredpassword, salt)


            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                phonenumber,
                profileImage: profileImage ? profileImage : `https://ui-avatars.com/api/?background=random&name=${username}&format=png`
            })

            const { password, ...other } = user._doc
            res.status(200).json({...other,token:generateToken(user._id)})
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

            res.status(200).json({...other,token:generateToken(user._id)})


        } else {
            res.status(400).json({ "message": "wrong email or password" })
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
module.exports = { register, login }