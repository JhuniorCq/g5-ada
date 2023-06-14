require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoDB = require('./dataBase/databaseDriver')

const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')

const app = express()

mongoDB()

app.disable("x-powered-by")
const corsOptions = {
    origin: '*',
};

app.use(express.json())
app.use(cors(corsOptions))

app.use('/login', loginRoute)
app.use('/register', registerRoute)

app.listen(process.env.PORT, () => {
    console.log('[LOG] Servidor iniciado en el puerto ' + process.env.PORT)
})


