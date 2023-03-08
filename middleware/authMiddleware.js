const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')


const protect = async (req, res, next) => {

  let cookies = {};

  const cookiesArray = req.headers.cookie.split(';');

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.trim().split('=');
    cookies[key] = value;
  });


  let token

  if (req.headers.cookie && cookies['access-token']) {
    try {
      // Get token from header
      token = cookies['access-token']
      // token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      res.status(401).json({ "message": "Not authorized" })
    }
  }

  if (!token) {
    res.status(401).json({ "message": "Not authorized, no token" })
  }
}

module.exports = protect 