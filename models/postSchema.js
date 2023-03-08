const mongoose  = require("mongoose");


const commentsSchema = new mongoose.Schema({

    comment: {
        type:String,
        required:true
    },
    user:mongoose.Types.ObjectId,

}, { timestamps: true })




const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type:[commentsSchema],
        default:[]
    },
    // comments: {
    //     user: {
    //         type: mongoose.Schema.ObjectId,
    //         required: true
    //     },
    //     username: {
    //         type: String,
    //         required: true
    //     },
    //     profile: {
    //         type: String
    //     },
    //     comment: {
    //         type: String,
    //         required: true
    //     }
    // },
}, { timestamps: true })


module.exports = mongoose.model("Post", PostSchema)