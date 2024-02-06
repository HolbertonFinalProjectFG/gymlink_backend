const { gym } = require('./gym.js')
const { clients_trainers } = require('./clients_trainers.js')
const { routines_templates } = require('./routines_templates.js')
const { routines } = require('./routines.js')
const { user_roles } = require('./user_roles.js')
const { user_routines } = require('./user_routines.js')
const { users } = require('./users.js')
const { roles } = require('./roles.js')
const { inventory } = require('./inventory.js')

const relations =

gym.hasMany(users, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id'
});

gym.hasMany(routines_templates, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id'
});

gym.hasMany(inventory, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id'
})

users.hasMany(user_roles, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
});

users.hasMany(user_routines, {
    foreignKey: 'client_user_id',
    sourceKey: 'user_id'
});

users.hasMany(clients_trainers, {
    foreignKey: 'client_user_id',
    sourceKey: 'user_id'
});

users.hasMany(clients_trainers, {
    foreignKey: 'trainer_user_id',
    sourceKey: 'user_id'
});

routines_templates.hasMany(routines, {
    foreignKey: 'routine_template_id',
    sourceKey: 'routine_template_id'
});

routines.hasMany(user_routines, {
    foreignKey: 'routine_id',
    sourceKey: 'routine_id'
});

roles.hasMany(user_roles, {
    foreignKey: 'role_id',
    sourceKey: 'role_id'
});

module.exports = {
    relations
}