const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser, putUsersData, getUserById, getUsersByRole } = require('../controllers/User');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware')
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware')

User.use(JwtMiddleware)

User.get('/', getAllUsers);

User.get('/:user_id', getUserById);

User.get('/role/:role_id', getUsersByRole);

User.post('/', postNewUser);

User.patch('/:user_id', putUsersData);

User.delete('/:user_id', deleteUser);

module.exports = {
    User
};
