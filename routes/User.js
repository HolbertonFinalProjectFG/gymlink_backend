const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser, putUsersData, getUserById, getUsersByRole, getTrainerClients } = require('../controllers/User');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');

User.use(JwtMiddleware)

User.get('/', PermissionsMiddleware([1, 2, 3]), getAllUsers);

User.get('/:user_id', PermissionsMiddleware([1, 2, 3]), getUserById);

User.get('/role/:role_id', PermissionsMiddleware([1, 2]), getUsersByRole);

User.get('/trainer/clients', PermissionsMiddleware([3]), getTrainerClients);

User.post('/', PermissionsMiddleware([1, 2]), postNewUser);

User.patch('/:user_id', PermissionsMiddleware([1, 2]), putUsersData);

User.delete('/:user_id', PermissionsMiddleware([1, 2]), deleteUser);

module.exports = {
    User
};
