const {appModel} = require('../dataSchemas/appSchema')
const {userModel} = require("../dataSchemas/userSchema");
const mongoose = require('mongoose').default


module.exports = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('[MONGO] Conexión exitosa a la base de datos...')
    }).catch((e) => {
        console.log(e)
        console.log('[ERROR] Error al conectar con la base de datos...')
    })
}