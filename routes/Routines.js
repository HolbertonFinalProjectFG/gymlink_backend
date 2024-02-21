const { Router } = require('express')
const Routines = Router()
const { getRoutines, postRoutine, deleteRoutine} = require('../controllers/Routines.js')
const { JwtMiddleware } = require('../middlewares/JwtMiddleware');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware');

const roles = [3]

Routines.use(JwtMiddleware, PermissionsMiddleware(roles));

Routines.get('/', getRoutines)

Routines.post('/', postRoutine)

Routines.delete('/:routine_id', deleteRoutine)

module.exports = {
    Routines
}
