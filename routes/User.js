const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser, putUsersData, getUserById, getUsersByRole, getClientRoutines, getTrainerClients } = require('../controllers/User');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');
const { getRoutineById } = require('../controllers/Routines');

// User.use(JwtMiddleware)

User.get('/', JwtMiddleware, PermissionsMiddleware([1, 2, 3]), getAllUsers);

User.get('/:user_id', JwtMiddleware, PermissionsMiddleware([1, 2, 3]), getUserById);

User.get('/role/:role_id', JwtMiddleware, PermissionsMiddleware([1, 2]), getUsersByRole);

User.get('/trainer/clients', JwtMiddleware, PermissionsMiddleware([3]), getTrainerClients);

User.get('/client/routines/:user_id/:routine_id', getClientRoutines);

User.post('/', JwtMiddleware, PermissionsMiddleware([1, 2]), postNewUser);

User.post('/', JwtMiddleware, PermissionsMiddleware([1, 2]), postNewUser);

User.patch('/:user_id', JwtMiddleware, PermissionsMiddleware([1, 2]), putUsersData);

User.delete('/:user_id', JwtMiddleware, PermissionsMiddleware([1, 2]), deleteUser);

module.exports = {
    User
};
