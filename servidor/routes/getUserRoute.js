const router = require('express').Router()
const {userModel} = require('../dataSchemas/userSchema')

router.get('/', async (req, res) => {
    const username = req.query.username;

    try {
        userModel.findOne({username: username.toString()}).then(userData => {
            if (userData) {
                res.status(200).send(userData)
            } else {
                res.status(400).send({message: 'Este usuario no existe...'})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error interno de servidor...'})
    }
})

module.exports = router