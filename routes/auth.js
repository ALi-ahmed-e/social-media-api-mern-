const { register,login, logout } = require("../controllers/authController")
const protect = require("../middleware/authMiddleware")
const router = require("express").Router()



//register
router.post("/register", register)

//register
router.post("/login", login)

//logout
router.post("/logout",protect, logout)



module.exports = router