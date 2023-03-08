const { register,login } = require("../controllers/authController")
const router = require("express").Router()



//register
router.post("/register", register)

//register
router.post("/login", login)



module.exports = router