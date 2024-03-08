const express = require('express');
const Mg = express.Router();
const { postMgTemplate, getMgTemplate, deleteMgTemplate } = require('../controllers/Mg_template');
const { JwtMiddleware } = require('../middlewares/JwtMiddleware');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');

const roles = [3]

Mg.use(JwtMiddleware, PermissionsMiddleware(roles));

Mg.get('/', getMgTemplate);

Mg.post('/', postMgTemplate);

Mg.delete('/:mg_template_id', deleteMgTemplate);

module.exports = {
    Mg,
}