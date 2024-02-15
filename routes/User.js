const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser, putUsersData, getUserById, getUsersByRole } = require('../controllers/User');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');

User.use(JwtMiddleware)

User.get('/', PermissionsMiddleware([1, 2, 3]), getAllUsers);

User.get('/:user_id', PermissionsMiddleware([1, 2, 3]), getUserById); // Permissions for trainer??

User.get('/role/:role_id', PermissionsMiddleware([1, 2]), getUsersByRole);

User.post('/', postNewUser);

User.patch('/:user_id', PermissionsMiddleware([1]), putUsersData);

User.delete('/:user_id', PermissionsMiddleware([1]), deleteUser);

module.exports = {
    User
};
