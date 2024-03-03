const e = require('express');
const sequelize = require('../database/database.js');
const { User } = require('../models/User.js');
const { Role } = require('../models/Role.js');
const { Routine } = require('../models/Routine')
const { User_routine } = require('../models/User_routine.js');
const { User_role } = require('../models/User_role.js');
const { Client_trainer } = require('../models/Client_trainer.js');
const { userUpdateSchema, userSchema } = require('../schemas/User.js');
const { ZodError} = require('zod');
const { Op } = require('sequelize')

const getAllUsers = async(req, res) => {
  try{
    const users = await User.findAll();
    res.status(200).json({ok: true, data: users});
  } catch (err) {
    console.log(err)
    res.status(500).json({ok: false, msg: 'Something failed on server side', error: err.message});
  }
}

const getUserById = async(req, res) => {
  const { user_id } = req.params;
  try {
    const users = await User.findAll({
      where: { user_id },
      include: {
        model: User_role,
        include: { model: Role }
      }
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ ok: false, msg: "User not found" });
    }

    const userData = users.map(user => ({
      user_id: user.user_id,
      name: user.name,
      surname: user.surname,
      CI: user.CI,
      email: user.email,
      birth_date: user.birth_date,
      password: user.password,
      phone_number: user.phone_number,
      emergency_number: user.emergency_number,
      insurance: user.insurance,
      role: user.user_roles.map(userRole => userRole.role.role_name).join(", ")
    }));

    res.status(200).json({ ok: true, data: userData });
  } catch (err){
    console.log(err)
      res.status(500).json({ok: false, msg: "An error ocurred on server side", err: err.message});
  }
};

const getUsersByRole = async(req, res) => {
  try {
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
      res.status(500).json({ok: false, msg: "An error ocurred on server side", error: err.message});
  }
}

const getTrainerClients = async(req, res) => {
  try {
    const trainer_id = req.user.user_id;
    const clients = await Client_trainer.findAll({
      where: {
        trainer_user_id: trainer_id,
      },
      include: {
        model: User,
        include: {
          model: User_routine,
          include: {
            model: Routine
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    let users = []
    for (const client of clients) {
      const userJson = JSON.parse(JSON.stringify(client.dataValues.user));
      if (client.dataValues.user.user_routines[0].routine_id){
        const userId = client.dataValues.user.user_id;
        const routineId = client.dataValues.user.user_routines[0].routine_id;
        userJson.link = `http://localhost:3000/api/user/client/routines/${userId}/${routineId}`;
      } else {
        userJson.link = null;
      }
      users.push(userJson)
    }
    res.status(200).json({ ok: true, data: users });
  } catch (error) {
    console.log(error)
    res.status(500).json({ok: false, msg: 'An error ocurred on server side'});
  }
}

const  getClientRoutines = async(req, res) => {
  try {
    const { user_id, routine_id } = req.params;
    const clientRoutine = await Routine.findOne({
      attributes: ['personalized_content'],
      where: {
        routine_id,
      },
      include: {
        model: User_routine,
        where: {
          routine_id,
          client_user_id: user_id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    });
    if (!clientRoutine || clientRoutine.length === 0)
      throw new Error('Routine not assigned');

    res.status(200).json({
      ok: true,
      data: clientRoutine.personalized_content,
    });
  } catch (err) {
    console.log(err);
    if (err.message === 'Routine not assigned') {
      res.status(400).json({
        ok: false,
        msg: 'Routine is not assigned'
      });
    } else {
      res.status(500).json({
        ok: false,
        msg: 'Something failed on server side'
      });
    };
  }
}

const postNewUser = async(req, res) => {
  try{
    const { role_id, trainer_id } = req.body;
    const checkedData = userSchema.parse(req.body);
    // The password for now will be CI
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
      const trainer = await User.findByPk(trainer_id);
      if (trainer !== null)
        await Client_trainer.create({client_user_id: newUser.user_id, trainer_user_id: trainer_id});    
    }
    res.status(200).json({ok: true, msg: 'User correctly added'});
  } catch(err) {
    console.log(err);
    if (err instanceof ZodError) {
      res.status(400).json({
        ok: "false",
        msg: 'express-validator errors'
      });
    } else {
      res.status(500).json({
        ok: false, 
        msg: 'Something failed on server side',
        err: err.msg
      });
    }
  }
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
  } catch (err){
    console.log(err)
      res.status(500).json({ok: false, msg: "An error ocurred on server side"});
  }
};

const putUsersData = async (req, res) => {
  try {
    const { user_id } = req.params
    let updatedValues = 0                                           
    const checkedData = userUpdateSchema.partial().safeParse(req.body)
    if (checkedData.success === false) {
      throw new ZodError(checkedData.error)
    }
    if (Object.keys(checkedData.data).length == 0){
      throw new ZodError('Nothing to update / Cannot update that value')
    }
    const user = await User.findByPk(user_id)
    if (user === null) {
      throw new Error('User does not exist')
    }
    const roles = checkedData.data.role_id
    console.log(roles)
    delete checkedData.data.role_id
    const trainer_id = checkedData.data.trainer_id
    delete checkedData.data.trainer_id
    for (key in user.dataValues){
      if(checkedData.data[key] && checkedData.data[key] !== user.dataValues[key])
      {
        updatedValues += 1;
      }
    }
    if (roles !== undefined){
      const actualRole = await User_role.findAll({
        where: {
          user_id,
          role_id: roles[0]
        }
      })
      if (actualRole.length === 0) {
        await User_role.destroy({
          where: {
            user_id: user.user_id
          }
        })
        for (const id of roles) {
          User_role.create({user_id: user.user_id, role_id: id});
        }
        updatedValues += 1
      }
    }
    if (trainer_id !== undefined) {
      const trainer = await User_role.findAll({
        where: {
          user_id: trainer_id,
          role_id: 3
        }
      })
      if (trainer.length === 0) {
        throw new Error('Trainer does not exist')
      }
      const relation = await Client_trainer.findAll({
        where: {
          client_user_id: user.user_id
        }
      })
      if (relation !== null) {
        const userTrainer = await Client_trainer.findAll({
          where: {
            client_user_id: user.user_id,
            trainer_user_id: trainer_id
          }
        })
        if (userTrainer.length === 0) {
          await Client_trainer.destroy({
          where: {
            client_user_id: user.user_id
          }
          })
          await Client_trainer.create({
            client_user_id: user_id, 
            trainer_user_id: trainer_id
          })
          updatedValues += 1}
      }  
    }
    const usersEmails = await User.findAll({
      attributes: ['email'],
      where: {
        user_id: {[Op.ne]: user.user_id}
      }
    })
    for (email of usersEmails) {
      if (email.dataValues.email === checkedData.data.email) {
        throw new Error('Email already exists')
      }
    }
    await User.update(checkedData.data, {
      where: {
        user_id,
      }
    });
    res.status(200)
    res.json({
      ok: true,
      msg: 'Client correctly updated',
      updatedValues
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
    else if (err.message == 'Trainer does not exist') {
      res.status(400).json({
        ok: "false",
        msg: 'Trainer does not exist'
    })
    } 
    else if (err.message == 'Email already exists') {
      res.status(400).json({
        ok: "false",
        msg: 'Trainer does not exist'
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
  getUserById,
  getTrainerClients,
  getClientRoutines,
  postNewUser,
  putUsersData,
  deleteUser,
}
