const { Gym } = require('./Gym.js')
const { Client_trainer } = require('./Client_trainer.js')
const { Routine_template } = require('./Routine_template.js')
const { Routine } = require('./Routine.js')
const { User_role } = require('./User_role.js')
const { User_routine } = require('./User_routine.js')
const { User } = require('./User.js')
const { Role } = require('./Role.js')
const { Inventory } = require('./Inventory.js')

const Relation =

Gym.hasMany(User, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id'
});

Gym.hasMany(Routine_template, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id'
});

Gym.hasMany(Inventory, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id'
})

User.hasMany(User_role, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
});

User.hasMany(User_routine, {
    foreignKey: 'client_user_id',
    sourceKey: 'user_id'
});

User.hasMany(Client_trainer, {
    foreignKey: 'client_user_id',
    sourceKey: 'user_id'
});

User.hasMany(Client_trainer, {
    foreignKey: 'trainer_user_id',
    sourceKey: 'user_id'
});

Routine_template.hasMany(Routine, {
    foreignKey: 'routine_template_id',
    sourceKey: 'routine_template_id'
});

Routine.hasMany(User_routine, {
    foreignKey: 'routine_id',
    sourceKey: 'routine_id'
});

Role.hasMany(User_role, {
    foreignKey: 'role_id',
    sourceKey: 'role_id'
});

module.exports = {
    Relation
}