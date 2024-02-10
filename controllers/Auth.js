const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { User } = require('../models/User')
const { User_role } = require('../models/User_role')
const { JWT_SECRET_KEY } = require('../config')

const handleLogin = async (req, res, next) => {
    console.log(`====>>>>${req.user}<<<<====`)
    try {    
      const user = await User.findAll({
          attributes: ['user_id', 'password'],
          where: {
            email: req.body.email
          }
      })
      if (user.length === 0) {
        throw new Error('User doesn\'t exists.')
      }
      if (req.body.password != user[0].password) {
          throw new Error('Inconrrect password')
      }
      const roles = await User_role.findAll({
          attributes: ['role_id'],
          where: {
              "user_id": user[0].dataValues.user_id
          }
      })
      const roles_array = []
      for (const role of roles){
        roles_array.push(role.dataValues.role_id)
      }
      const token =jwt.sign({
          user_role: roles_array,
      }, JWT_SECRET_KEY, {
        expiresIn: 1000 * 15
      })
      res.cookie("jwt", token)
      res.status(400).json({
          ok: true,
          msg: "User succesfully logged"
      })
    }
    catch (err) {
        console.log(err)
        if (err.message == 'Incorrect password') {
            res.status(400).json({
                ok: "false",
                msg: "Error: Incorrect password"
            })
        }
        else if (err.message == 'Erroe: User doesn\'t exists.') {
        res.status(400).json({
            ok: "false",
            msg: "User does not exist"
        })
        }
        else {
            res.status(400).json({
                ok: "false",
                msg: "failed"
            })
        }
    }   
}

function JwtMiddleware(req, res, next) {
  const token = req.headers['jwt'];
  if (!token) {res.status(401).json({ok: false, msg: "JWT token not provided"})};
  
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ok: false, msg: "JWT token expired"})
    } else {
      req.user = decoded;
      next();
    }
  })
}

module.exports = {
    handleLogin,
    JwtMiddleware
}