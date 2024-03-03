const { Router } = require('express')
const Routines = Router()
const { getRoutines, getRoutineById, postRoutine, deleteRoutine} = require('../controllers/Routines.js')
const { JwtMiddleware } = require('../middlewares/JwtMiddleware.js');
const { PermissionsMiddleware } = require('../middlewares/RolePermissionsMiddleware.js');

const roles = [3]

Routines.use(JwtMiddleware);

Routines.get('/', PermissionsMiddleware(roles), getRoutines)

Routines.get('/:routine_id', PermissionsMiddleware(roles), getRoutineById)

Routines.post('/', PermissionsMiddleware(roles), postRoutine)

Routines.delete('/:routine_id', PermissionsMiddleware(roles), deleteRoutine)

module.exports = {
    Routines
}
