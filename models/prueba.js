const { sequelize } = require('../database/database.js')
const { DataTypes } = require('sequelize')

const clients_trainers = sequelize.define('clients_trainers', {
    client_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id',
        },
    },
    trainer_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id',
        },
    }
})

const gym = sequelize.define('gym', {
    gym_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gym_name: {
        type: DataTypes.STRING(50)
    }
});

const roles = sequelize.define('roles', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING(50)
    }
})

const routines_templates = sequelize.define('routines_templates', {
    routine_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.JSON,
    },
    gym_id: {
        type: DataTypes.INTEGER,
    }
});

const routines = sequelize.define('routines', {
    routine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    personalized_content: {
        type: DataTypes.JSON,
    }
});

const user_role = sequelize.define('user_rol')

const user_routines = sequelize.define('user_routines', {
    user_id: {
        type: DataTypes.INTEGER
    },
    trainer_user_id: {
        type: DataTypes.INTEGER
    }
})

const users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        required: true
    },
    surname: {
        type: DataTypes.STRING(50),
        required: true
    },
    email: {
        type: DataTypes.STRING(30),
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING(30),
        required: true,
        allowNull: true
    },
    _phone_number: {
      type: DataTypes.STRING(50),
      required: true
    },
    emergency_number: {
        type: DataTypes.STRING(50),
        required: true
    }
});



users.hasMany(user_role, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
})

users.hasMany(user_routines, {
    foreignKey: 'user_id',
    sourceKey: 'user_id'
})

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

roles.hasMany(user_role, {
    foreignKey: 'role_id',
    sourceKey: 'role_id'
})

user_role.belongsTo(roles, {
    foreignKey: 'role_id',
    targetId: 'role_id'
})

routines_templates.hasMany(routines, {
    foreignKey: 'routine_id',
    sourceKey: 'routine_id',
});

routines_templates.belongsTo(gym, {
    foreignKey: 'gym_id',
    sourceKey: 'gym_id'
});

user_role.belongsTo(users, {
    foreignKey: 'user_id',
    targetId: 'user_id'
})

user_role.belongsTo(roles, {
    foreignKey: 'role_id',
    targetId: 'role_id'
})

routines.hasMany(user_routines, {
    foreignKey: 'routine_id',
    sourceKey: 'routine_id'
})

routines.belongsTo(routines_templates, {
    foreignKey: 'routine_id',
    sourceKey: 'routine_id'
})