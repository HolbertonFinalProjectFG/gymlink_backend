const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser, putUsersData } = require('../controllers/User');


User.get('/', getAllUsers);

User.post('/', postNewUser);

User.patch('/:user_id', putUsersData);

User.delete('/:user_id', deleteUser);

module.exports = {
    User
};
