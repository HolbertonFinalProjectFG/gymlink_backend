const e = require('express');
const sequelize = require('../database/database.js')
const {User} = require('../models/User.js')

const getAllUsers = async(req, res) => {
  try{
    const users = await User.findAll();
    res.status(200).json({ok: true, data: users});
  } catch {
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const getUsersWithRole = async(req, res) => {
  const roleId = req.params;
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        where: {
          id: roleId
        }
      }
    });
    res.status(200).json({ok: true, data: users});

  } catch {
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
}

const deleteUser = async(req, res) => {
  try {
    console.log(req.params)
    const { user_id } = req.params;
    await User.destroy({
      where: {
        user_id
      },
    })
    res.status(200).json({
      "ok": true,
      "msg": `User with id ${user_id} deleted succesfully`
    });
  } catch {
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const postNewUser = async(req, res) => {
  const {
    name,
    surname,
    ci,
    email,
    password,
    phone_number,
    emergency_number,
    insurance_number,
    role
  } = req.body;
  let statusFunction = {
    status: 0,
    msgStatus: {}
  }
  try{    
    if (2 === 1) { // Zod autentication
      statusFunction.status = 400;
      statusFunction.msgStatus.ok = false;
      statusFunction.msgStatus.error = 'express-validator errors';
      // const json = JSON.parse(statusFunction);
      res.status(statusFunction.status).json(statusFunction.msgStatus);
    }
      await User.create({
          name,
          surname,
          ci,
          email,
          password,
          phone_number,
          emergency_number,
          insurance_number,
      });
  } catch(err) {
      statusFunction.status = 500;
      statusFunction.msgStatus.ok = false;
      statusFunction.msgStatus.msg = err;
      // const json = JSON.parse(statusFunction);
      res.status(statusFunction.status).json(statusFunction.msgStatus);
  }
  statusFunction.status = 200;
  statusFunction.msgStatus.ok = true;
  statusFunction.msgStatus.msg = 'User correctly added';

  // const json = JSON.parse(statusFunction);
  res.status(statusFunction.status).json(statusFunction.msgStatus);
}

//const putUsersData = async (req, res) => {
//    const { user_id } = req.params
//    const data = req.body
//    Object.keys(data).forEach((element) => {
//        if (element)
//    })
//    await User.update(data, {
//        where: {
//          user_id: id
//        }
//    });
//}

module.exports = {
    getAllUsers,
    getUsersWithRole,
    deleteUser,
    postNewUser,
   // putUsersData
}