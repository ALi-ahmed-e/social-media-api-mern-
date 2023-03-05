const { register,login ,updateUser, deleteUser, getUser,togglefollowUser} = require("../controllers/userController")
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



module.exports = router