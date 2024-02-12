const e = require('express');
const sequelize = require('../database/database.js');
const {User} = require('../models/User.js');
const { User_role } = require('../models/User_role.js');
const { Client_trainer } = require('../models/Client_trainer.js');
const { userUpdateSchema, userSchema } = require('../schemas/User.js');
const { ZodError} = require('zod');

const getAllUsers = async(req, res) => {
  try{
    // if (req.user.user_role[0] !== 2) {
    //   throw new Error('JWT error')
    // };
    const users = await User.findAll();
    res.status(200).json({ok: true, data: users});
  } catch (err) {
    console.log(err)
    // if (err.message == 'JWT error') {
    //   res.status(400).json({ok: false, msg: 'JWT error'});
    // }
    // else {
    res.status(500).json({ok: false, msg: 'Something failed on server side', error: err.message});
  // }
  }
};

const getUserById = async(req, res) => {
  const { user_id } = req.params;
  try {
    // if (req.user.user_role[0] !== 2) {
    //   throw new Error('JWT error')
    // };
    const users = await User.findAll({
      where: {
        user_id: user_id
      }
    });
    const roles = await User_role.findAll({
      where: {
        user_id: user_id
      }
    });

    const roleNames = roles.map(role => role.role_id);

    const usersWithRoles = users.map(user => ({
      ...user.toJSON(), // Convert Sequelize instance to plain object
      roles: roleNames
    }));

    res.status(200).json({ok: true, data: usersWithRoles   });
  } catch (err){
    console.log(err)
    // if (err.message === 'JWT error') {
    //   res.status(400).json({ok: false, msg: 'JWT error'});
    // }
    // else {
      res.status(500).json({ok: false, msg: "An error ocurred on server side"});
    // }
  }
};

const getUsersByRole = async(req, res) => {
  try {
    // if (req.user.user_role[0] !== 2) {
    //   throw new Error('JWT error')
    // };
    const { role_id } = req.params;
    const users = await User.findAll({
      include: {
        model: User_role,
        where: { role_id: role_id }
      }
    });
    res.status(200).json({ok: true, data: users});
  } catch (err){
    console.log(err)
    // if (err.message === 'JWT error') {
    //   res.status(400).json({ok: false, msg: 'JWT error'});
    // }
    // else {
      res.status(500).json({ok: false, msg: "An error ocurred on server side", error: err.message});
    // }
  }
}

const postNewUser = async(req, res) => {
  try{
    // if (req.user.user_role[0] !== 2) {
    //  throw new Error('JWT error')
    // };
    const { role_id, trainer_id } = req.body;

    const checkedData = userSchema.parse(req.body)

    // La contraseña por ahora va a ser CI
    const newUser = await User.create(
      {
        ...checkedData,
        password: req.body.CI

      }
    );
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
      const msgErr = err.issues.map((issue) => ({ok: false, msg: issue.message}))
      res.status(400).json(msgErr[0])
    }
    // else if (err.message === 'JWT error') {
    //   res.status(400).json({ok: false, msg: 'JWT error'});
    // }
    // else {
      res.status(500).json({ok: false, msg: 'Something failed on server side'})
    // };
  }
}

const deleteUser = async(req, res) => {
  try {
    // if (req.user.user_role[0] !== 2) {
    //   throw new Error('JWT error')
    // };
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
    // if (err.message === 'JWT error') {
    //   res.status(400).json({ok: false, msg: 'JWT error'});
    // }
    // else {
      res.status(500).json({ok: false, msg: "An error ocurred on server side"});
    // }
  }
};

const putUsersData = async (req, res) => {
  try {
    // if (req.user.user_role[0] !== 2) {
    //   throw new Error('JWT error')
    // };
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
    // }
    // else if (err.message === 'JWT error') {
    //   res.status(400).json({ok: false, msg: 'JWT error'});
    // }
    } else {
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
