const { Router } = require('express')
const Routines = Router()
const { getRoutines, getClientRoutine, postRoutine, deleteRoutine} = require('../controllers/Routines.js')
const { JwtMiddleware } = require('../middlewares/JwtMiddleware.js');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware.js');

const roles = [3]

Routines.use(JwtMiddleware);

Routines.get('/', PermissionsMiddleware([3]), getRoutines)

Routines.post('/', PermissionsMiddleware([3]), postRoutine)

Routines.delete('/:routine_id', PermissionsMiddleware([3]), deleteRoutine)

module.exports = {
    Routines
}
