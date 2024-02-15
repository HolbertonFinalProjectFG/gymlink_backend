const express = require('express');
const Auth = express.Router();
const { handleLogin } = require('../controllers/Auth');

Auth.post('/', handleLogin)

module.exports = {
    Auth
}
