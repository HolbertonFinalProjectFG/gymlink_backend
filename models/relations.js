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
    sourceKey: 'user_id',
});
  
users.hasMany(clients_trainers, {
    foreignKey: 'trainer_user_id',
    sourceKey: 'user_id',
});

clients_trainers.belongsTo(users, {
    foreignKey: 'client_user_id',
    targetKey: 'user_id',
});
  
clients_trainers.belongsTo(users, {
    foreignKey: 'trainer_user_id',
    targetKey: 'user_id',
});

gym.hasMany(users, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id',
});

gym.hasMany(routines_templates, {
    foreignKey: 'gym_id',
    socrceKey: 'gym_id',
});

roles.hasMany(user_roles, {
    foreignKey: 'role_id',
    sourceKey: 'role_id'
});

user_roles.belongsTo(roles, {
    foreignKey: 'role_id',
    targetId: 'role_id'
});


user_roles.belongsTo(users, {
    foreignKey: 'user_id',
    targetId: 'user_id'
});

routines.hasMany(user_routines, {
    foreignKey: 'routine_id',
    sourceKey: 'routine_id'
});

routines.belongsTo(routines_templates, {
    foreignKey: 'routines_template_id',
    targetId: 'routines_template_id'
});

routines_templates.belongsTo(gym, {
    foreignKey: 'gym_id',
    sourceKey: 'gym_id'
});

//routines_templates.hasMany(routines, {
//    foreignKey: 'routines_template_id',
//    sourceKey: 'routines_template_id',
//});

gym.hasMany(inventory, {
    forignKey: 'gym_id',
    sourceKey: 'gym_id'
}) 

module.exports = {
    relations
}