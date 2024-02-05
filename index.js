const { sequelize } = require('./database/database')
const express = require('express')
const { PORT } = require('./config.js')
const { gym } = require('./models/gym.js')
const { clients_trainers } = require('./models/clients_trainers.js')
const { routines_templates } = require('./models/routines_templates.js')
const { routines } = require('./models/routines.js')
const { user_role } = require('./models/user_roles.js')
const { user_routines } = require('./models/user_routines.js')
const { users } = require('./models/users.js')
const { roles } = require('./models/roles.js')
const { relations } = require('./models/relations.js')

const app = express()

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})

async function main() {
    await sequelize.sync({ force: true })
}
main()