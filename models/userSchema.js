const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    Followers: {
        type: Array,
        default:[]
    },
    Following: {
        type: Array,
        default:[]
    },
    phonenumber: {
        type: Number,
        required: true
    },

    profile: {
        type: String,
    },
    profileImage: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    verifed: {
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps:true})


module.exports = mongoose.model("User",UserSchema)