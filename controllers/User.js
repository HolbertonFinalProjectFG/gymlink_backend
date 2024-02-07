const e = require('express');
const sequelize = require('../database/database.js')
const {User} = require('../models/User.js')
const { userUpdateSchema } = require('../schemas/User.js')
const { ZodError} = require('zod');

const getAllUsers = async(req, res) => {
  try{
    const users = await User.findAll();
    res.status(200).json({ok: true, data: users});
  } catch {
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const getUserById = async(req, res) => {
  try {
    const { user_id } = req.params;
    const users = await User.findByPk(user_id);
    res.status(200).json({ok: true, data: [ users ]});
  } catch {
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const getUsersByRole = async(req, res) => {
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
      res.status(statusFunction.status)
      res.json(statusFunction.msgStatus);
    }
    
const deleteUser = async(req, res) => {
  try {
    const { user_id } = req.params;
    const users = await User.findByPk(user_id);  
    if (users !== null) {
      await users.destroy();
    res.status(200).json({
      'ok': true,
      'msg': `User with id ${user_id} deleted succesfully`
    });
    } else {
      res.status(404).json({
        'ok': false,
        'msg': "client_id doesn't exists"
      });
    }
  } catch {
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const putUsersData = async (req, res) => {
  try {
    const { user_id } = req.params                                           
    const checkedData = userUpdateSchema.partial().parse(req.body)
    if (Object.keys(checkedData).length == 0){
      throw new ZodError('Nothing to update / Cannot update that value')
    }
    const user = await User.findByPk(user_id)
    if (user === null) {
      throw new Error('User does not exist')
    }
    for (key in user.dataValues){
      if(checkedData[key] && checkedData[key] === user.dataValues[key])
      {
        throw new ZodError(`Cannot update field with the same value\nActual ${key}: ${user.dataValues[key]}, new ${key}: ${checkedData[key]}`)
      } 
    }
    await User.update(checkedData, {
      where: {
        user_id,
      }
    });
    res.status(200)
    res.json({
      ok: true,
      msg: 'Client correctly updated'
    })  
  } 
  catch(err) {
    console.log(err)
    if (err instanceof(ZodError)) {
      res.status(400).json({
        ok: false,
        error: "express-validator errors"
      })
    }
    else {
      res.status(500).json({
      ok: false,
      error: 'Something failed on server side'
      })
    }
  }
}

module.exports = {
    getAllUsers,
    getUsersByRole,
    deleteUser,
    postNewUser,
    putUsersData,
    getUserById
}