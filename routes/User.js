const express = require('express');
const User = express.Router();
const { getAllUsers, postNewUser, deleteUser } = require('../controllers/User');


User.get('/', getAllUsers);

User.post('/', postNewUser);

User.delete('/:user_id', deleteUser);

module.exports = {
    User
};
