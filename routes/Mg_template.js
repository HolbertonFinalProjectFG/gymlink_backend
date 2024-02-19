const express = require('express');
const Routine = express.Router();
const { postMgTemplate } = require('../controllers/Mg_template');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');

const roles = [3]

// Routine.use(JwtMiddleware, PermissionsMiddleware(roles));

Routine.post('/', postMgTemplate);

module.exports = {
    Routine,
}