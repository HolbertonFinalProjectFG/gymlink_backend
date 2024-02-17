const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const { User_role } = require('../models/User_role')
const { JWT_SECRET_KEY } = require('../config')

const handleLogin = async (req, res, next) => {
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
    const token = jwt.sign({
      user_role: roles_array,
    }, JWT_SECRET_KEY, {
      expiresIn: 1000 * 60 * 60 * 8
    })
    res.cookie("jwt", token, {
      maxAge: 1000 * 60 * 60 * 8,
      httpOnly: false,
      sameSite: 'none',
      secure: true
    })
    const roleNames = {
      1: "superuser",
      2: "admin",
      3: "trainer",
      4: "client",
      5: "employee",
    }
    res.status(200).json({
      ok: true,
      msg: "User succesfully logged",
      role_id: roles_array[0],
      role_name: roleNames[roles_array[0]],
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
    else if (err.message == 'User doesn\'t exists.') {
      res.status(400).json({
        ok: "false",
        msg: "User does not exist"
    })
    }
    else {
      res.status(500).json({
        ok: "false",
        msg: "Error in the server side"
      })
    }
  }   
}

module.exports = {
    handleLogin
}
