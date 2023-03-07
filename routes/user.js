const { register,login ,updateUser, deleteUser, getUser,togglefollowUser, searcUsers, getsugestedUsers} = require("../controllers/userController")
const router = require("express").Router()



//register
router.post("/register", register)

//register
router.post("/login", login)

//update user
router.put("/update-user/:id", updateUser)

//delete user
router.delete("/delete-user/:id", deleteUser)

//get user
router.get("/get-user/:id", getUser)

//follow and unfollow user
router.post("/follow-user/:id", togglefollowUser)

//search users
router.get("/search-users/:q", searcUsers)

//get suggested users
router.get("/get-sug-users", getsugestedUsers)



module.exports = router