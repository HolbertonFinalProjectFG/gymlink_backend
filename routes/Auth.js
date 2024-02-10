const express = require('express');
const Auth = express.Router();
const { handleLogin, JwtMiddleware } = require('../controllers/Auth');

Auth.post('/', JwtMiddleware, handleLogin)

module.exports = {
    Auth
}
