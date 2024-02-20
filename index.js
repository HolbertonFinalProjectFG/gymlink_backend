const { sequelize } = require('./database/database.js')
const express = require('express')
const { PORT, FRONTED_HOST } = require('./config.js')
const { Gym , Client_trainer , Mg_template , Routine,User_role , User_routine , User , Role , Relation , Inventory} = require('./models/index.js')
const { User: userRouter } = require('./routes/User.js')
const { Inventory: inventoryRouter } = require('./routes/Inventory.js')
const { Auth: authRouter } = require('./routes/Auth.js')
const { Mg: MgRouter } = require('./routes/Mg_template.js');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
origin: FRONTED_HOST, // replace with your frontend's URL
credentials: true,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', FRONTED_HOST);
    res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, application/json');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/user', userRouter)
app.use('/api/inventory', inventoryRouter)
app.use('/api/login', authRouter)
app.use('/api/mg', MgRouter);

app.listen(PORT, async () => {
    await sequelize.sync();
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
