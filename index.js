const { sequelize } = require('./database/database')
const express = require('express')
const { PORT } = require('./config.js')
const { Gym , Client_trainer , Routine_template , Routine,User_role , User_routine , User , Role , Relation , Inventory} = require('./models/index.js')
const { User: userRouter } = require('./routes/User.js')
const { Inventory: inventoryRouter } = require('./routes/Inventory.js')

const app = express()

app.use(express.json());

app.use("/api/user", userRouter)
app.use("/api/inventory", inventoryRouter)

app.listen(PORT, async () => {
    await sequelize.sync()
    try {
    await Role.bulkCreate([
        {role_name: "superuser"},
        {role_name: "admin"},
        {role_name: "trainer"},
        {role_name: "client"},
        {role_name: "employee"},
    ])
    } catch {}
    console.log("Tables created and roles added")
    console.log(`Server running in port ${PORT}`)
})
