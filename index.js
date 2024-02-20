const { sequelize } = require('./database/database.js')
const express = require('express')
const { PORT, FRONTED_HOST } = require('./config.js')
const { Gym , Client_trainer , Mg_template , Routine,User_role , User_routine , User , Role , Relation , Inventory} = require('./models/index.js')
const { User: userRouter } = require('./routes/User.js')
const { Inventory: inventoryRouter } = require('./routes/Inventory.js')
const { Auth: authRouter } = require('./routes/Auth.js')
const { Mg: mgRouter } = require('./routes/Mg_template.js')
const { Routines: routinesRouter} = require('./routes/Routines.js')
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
app.use('/api/mg', mgRouter)
app.use('/api/routines', routinesRouter)

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
    try {
        await User.create({
            name: "Super",
            surname: "User",
            CI: "12345678",
            password: "12345678",
            email: "super@gmail.com",
            birth_date: "2024-01-29T00:00:00.000Z",
            phone_number: "+598091517864",
            emergency_number: "+5982345678955",
            insurance: "CAMOC",
        })
        await User_role.create({
            user_id: 1,
            role_id: 1
        })
        await User.create({
            name: "Admin",
            surname: "Admin",
            CI: "123456789",
            password: "123456789",
            email: "admin@gmail.com",
            birth_date: "2024-01-29T00:00:00.000Z",
            phone_number: "+598091517864",
            emergency_number: "+5982345678955",
            insurance: "CAMOC",
        })
        await User_role.create({
            user_id: 2,
            role_id: 2
        })
        await User.create({
            name: "Trainer",
            surname: "Trainer",
            CI: "1234567890",
            password: "1234567890",
            email: "trainer@gmail.com",
            birth_date: "2024-01-29T00:00:00.000Z",
            phone_number: "+598091517864",
            emergency_number: "+5982345678955",
            insurance: "CAMOC",
        })
        await User_role.create({
            user_id: 3,
            role_id: 3
        })
        await User.create({
            name: "Client",
            surname: "Client",
            CI: "12345678901",
            password: "12345678901",
            email: "client@gmail.com",
            birth_date: "2024-01-29T00:00:00.000Z",
            phone_number: "+598091517864",
            emergency_number: "+5982345678955",
            insurance: "CAMOC",
        })
        await User_role.create({
            user_id: 4,
            role_id: 4
        })
    } catch (err) {}
    console.log("Tables created and roles added")
    console.log(`Server running in port ${PORT}`)
})
