const router = require('express').Router()
const {appModel} = require('../dataSchemas/appSchema')

router.get('/', async (req, res) => {
    const appid = req.query.appid;

    try {
        appModel.findOne({steam_appid: appid.toString()}).then(appData => {
            if (appData) {
                res.status(200).send(appData)
            } else {
                res.status(400).send({message: 'Esta aplicación no existe...'})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error interno de servidor...'})
    }
})

module.exports = router