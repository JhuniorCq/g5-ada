require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoDB = require('./dataBase/databaseDriver')

const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const searchRoute = require('./routes/searchGames')
const getUserRoute = require('./routes/getUserRoute')
const getAppRoute = require('./routes/getAppRoute')
const searchUsers = require('./routes/searchUserRoute')
const purchaseRoute = require('./routes/purchaseRoute')
const getLibraryRoute = require('./routes/getGameLibraryRoute')
const app = express()

mongoDB()

app.disable("x-powered-by")
const corsOptions = {
    origin: process.env.CORS_URL,
};

app.use(express.json())
app.use(cors(corsOptions))
console.log('[SERVER] Habilitando CORS para ', process.env.CORS_URL)

app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/searchApps', searchRoute)
app.use('/getUserByName', getUserRoute)
app.use('/getAppByID', getAppRoute)
app.use('/searchUsers', searchUsers)
app.use('/processPurchase', purchaseRoute)
app.use('/getLibrary', getLibraryRoute)

app.listen(process.env.PORT, () => {
    console.log('[SERVER] Servidor iniciado en el puerto ' + process.env.PORT)
})


