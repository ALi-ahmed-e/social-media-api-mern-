const {addPost,updatePost, deletePost, togglelikeePost, getPost, gettimelinePost,commentPost, deletecommentPost,getSomeonePosts} = require("../controllers/postsController")
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

//comment post
router.put("/comment-post/:id",protect, commentPost)

//delete comment 
router.put("/delete-comment-post/:id/:cmtid",protect, deletecommentPost)

//get post
router.get("/get-post/:id",protect, getPost)

//get someone posts
router.get("/get-someone-posts/:id",protect, getSomeonePosts)

//get timeline
router.get("/get-timeline-post",protect, gettimelinePost)



module.exports = router