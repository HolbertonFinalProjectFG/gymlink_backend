const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser, putUsersData, getUserById, getUsersByRole } = require('../controllers/User');
const { JwtMiddleware } = require('../controllers/Auth')

User.get('/', JwtMiddleware, getAllUsers);

User.get('/:user_id', JwtMiddleware, getUserById);

User.get('/role/:role_id', JwtMiddleware, getUsersByRole);

User.post('/', JwtMiddleware, postNewUser);

User.patch('/:user_id', JwtMiddleware, putUsersData);

User.delete('/:user_id', JwtMiddleware, deleteUser);

module.exports = {
    User
};
