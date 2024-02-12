const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config')

function JwtMiddleware(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new Error('JWT token not provided')
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    if (err.message == 'JWT token not provided') {
      {res.status(401).json({ok: false, msg: "JWT token not provided"})};
    }
    else {
      {res.status(401).json({ok: false, msg: "Something failed"})};
    }
  }
}

module.exports = {
  JwtMiddleware
}