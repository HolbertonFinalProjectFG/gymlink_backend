const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser, putUsersData, getUserById, getUsersByRole } = require('../controllers/User');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');

const roles = [1, 2];

User.use(JwtMiddleware, PermissionsMiddleware(roles))

User.get('/', getAllUsers);

User.get('/:user_id', getUserById); // Permissions for trainer??

User.get('/role/:role_id', getUsersByRole);

User.post('/', postNewUser);

User.patch('/:user_id', putUsersData);

User.delete('/:user_id', deleteUser);

module.exports = {
    User
};
