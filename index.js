const { sequelize } = require('./database/database')
const express = require('express')
const { PORT } = require('./config.js')
const { gym } = require('./models/prueba')
const { clients_trainers } = require('./models/prueba')
const { roles } = require('./models/prueba')
const { routines_templates } = require('./models/prueba')
const { routines } = require('./models/prueba')
const { user_role } = require('./models/prueba')
const { user_routines } = require('./models/prueba')
const { users } = require('./models/prueba')


const app = express()

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})

async function main() {
    await sequelize.sync()
}

main()