const { sequelize } = require('./database/database')
const express = require('express')
const { PORT } = require('./config.js')
const { Gym } = require('./models/Gym.js')
const { Client_trainer } = require('./models/Client_trainer.js')
const { Routine_template } = require('./models/Routine_template.js')
const { Routine } = require('./models/Routine.js')
const { User_role } = require('./models/User_role.js')
const { User_routine } = require('./models/User_routine.js')
const { User } = require('./models/User.js')
const { Role } = require('./models/Role.js')
const { Relation } = require('./models/Relation.js')
const { Inventory } = require('./models/Inventory.js')


const { User: userRouter } = require('./routes/User.js')
const { Inventory: inventoryRouter } = require('./routes/inventory_routes.js')

const app = express()

app.use(express.json());

app.use("/api/user", userRouter)
app.use("/api/inventory", inventoryRouter)

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})

async function main() {
    await sequelize.sync()
}
main()