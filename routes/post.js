const {addPost,updatePost, deletePost, togglelikeePost, getPost, gettimelinePost} = require("../controllers/postsController")
const router = require("express").Router()
const protect = require('../middleware/authMiddleware')



//add post
router.post("/add-post",protect, addPost)

//update post
router.put("/update-post/:id",protect, updatePost)

//delete post
router.delete("/delete-post/:id",protect, deletePost)

//like post
router.put("/like-post/:id",protect, togglelikeePost)

//get post
router.get("/get-post/:id",protect, getPost)

//get timeline
router.get("/get-timeline-post/:id",protect, gettimelinePost)



module.exports = router