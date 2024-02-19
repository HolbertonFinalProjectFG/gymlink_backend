const { Gym } = require('./Gym.js')
const { Client_trainer } = require('./Client_trainer.js')
const { Mg_template } = require('./Mg_template.js')
const { Routine } = require('./Routine.js')
const { User_role } = require('./User_role.js')
const { User_routine } = require('./User_routine.js')
const { User } = require('./User.js')
const { Role } = require('./Role.js')
const { Inventory } = require('./Inventory.js')

const Relation =

Gym.hasMany(User, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id',
    onDelete: "CASCADE"
});

Gym.hasMany(Mg_template, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id',
    onDelete: "CASCADE"
});

Gym.hasMany(Inventory, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id',
    onDelete: "CASCADE"
})

User.hasMany(User_role, {
    foreignKey: 'user_id',
    sourceKey: 'user_id',
    onDelete: "CASCADE"
});

User.hasMany(User_routine, {
    foreignKey: 'client_user_id',
    sourceKey: 'user_id',
    onDelete: "CASCADE"
});

User.hasMany(Client_trainer, {
    foreignKey: 'client_user_id',
    sourceKey: 'user_id',
    onDelete: "CASCADE"
});

User.hasMany(Client_trainer, {
    foreignKey: 'trainer_user_id',
    sourceKey: 'user_id',
    onDelete: "CASCADE"
});

Client_trainer.belongsTo(User, {
    foreignKey: 'trainer_user_id',
    targetKey: 'user_id',
})

Client_trainer.belongsTo(User, {
    foreignKey: 'client_user_id',
    targetKey: 'user_id',
})

Routine.hasMany(User_routine, {
    foreignKey: 'routine_id',
    sourceKey: 'routine_id',
    onDelete: "CASCADE"
});

Role.hasMany(User_role, {
    foreignKey: 'role_id',
    sourceKey: 'role_id',
    onDelete: "CASCADE"
});

module.exports = {
    Relation
}