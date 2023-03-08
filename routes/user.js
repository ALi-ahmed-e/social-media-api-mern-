const {updateUser, deleteUser, getUser,togglefollowUser, searcUsers, getsugestedUsers} = require("../controllers/userController")
const protect = require("../middleware/authMiddleware")
const router = require("express").Router()





//update user
router.put("/update-user",protect, updateUser)

//delete user
router.delete("/delete-user",protect, deleteUser)

//get user
router.get("/get-user/:id", getUser)

//follow and unfollow user
router.post("/follow-user/:id",protect, togglefollowUser)

//search users
router.get("/search-users/:q", searcUsers)

//get suggested users
router.get("/get-sug-users",protect, getsugestedUsers)



module.exports = router