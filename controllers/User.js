const e = require('express');
const sequelize = require('../database/database.js');
const {User} = require('../models/User.js');
const { User_role } = require('../models/User_role.js');
const { Client_trainer } = require('../models/Client_trainer.js');
const { userUpdateSchema, userSchema } = require('../schemas/User.js');
const { ZodError} = require('zod');

const getAllUsers = async(req, res) => {
  if (req.user.user_role[0] !== 2) {
    res.status(401).json({ok: false, msg: 'error jwt'});
  };
  try{
    const users = await User.findAll();
    res.status(200).json({ok: true, data: users});
  } catch (err) {
    console.log(err)
    res.status(500).json({ok: false, msg: 'Something failed on server side'});
  }
};

const getUserById = async(req, res) => {
  if (req.user.user_role[0] !== 2) {
    res.status(401).json({ok: false, msg: 'error jwt'});
  };
  try {
    const { user_id } = req.params;
    const users = await User.findByPk(user_id);
    res.status(200).json({ok: true, data: [ users ]});
  } catch (err){
    console.log(err)
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const getUsersByRole = async(req, res) => {
  if (req.user.user_role[0] !== 2) {
    res.status(401).json({ok: false, msg: 'error jwt'});
  };
  const roleId = req.params;
  try {
    const { users } = await User.findAll({
      include: {
        model: Role,
        where: {
          id: roleId
        }
      }
    });
    res.status(200).json({ok: true, data: users});

  } catch (err){
    console.log(err)
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
}

const postNewUser = async(req, res) => {
  if (req.user.user_role[0] !== 2 || req.user.user_role[0] !== 1) {
    res.status(401).json({ok: false, msg: 'error jwt'});
  };
  const { role_id, trainer_id } = req.body;
  try{
    const checkedData = userSchema.parse(req.body)
    const newUser = await User.create(checkedData);
    const numOfRoles = role_id.length;
    for (let i = 0; i < numOfRoles; i++) {
      User_role.create({user_id: newUser.user_id, role_id: role_id[i]});
    }
    if (trainer_id) {
      await Client_trainer.create({client_user_id: newUser.user_id, trainer_user_id: trainer_id})
    };
    res.status(200).json({ok: true, msg: 'User correctly added'});
  } catch(err) {
    console.log(err)
    if (err instanceof ZodError) {
      res.status(400).json({ok: false, msg: 'express-validator errors'})
    } else {
      res.status(500).json({ok: false, msg: 'Something failed on server side'})
    };
  }
}
    
const deleteUser = async(req, res) => {
  if (req.user.user_role[0] !== 2) {
    res.status(401).json({ok: false, msg: 'error jwt'});
  };
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
  } catch (err){
    console.log(err)
    res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const putUsersData = async (req, res) => {
  if (req.user.user_role[0] !== 2) {
    res.status(401).json({ok: false, msg: 'error jwt'});
  };
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
    const roles = checkedData.role_id
    delete checkedData.role_id
    console.log(roles)
    if (roles !== undefined){
      await User_role.destroy({
        where: {
          user_id: user.user_id
        }
      })
      for (const id of roles) {
        User_role.create({user_id: user.user_id, role_id: id});
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
