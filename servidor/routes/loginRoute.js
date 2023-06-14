const router = require('express').Router()
const {userModel, userDataValidation} = require('../dataSchemas/userSchema')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    const {dataError} = userDataValidation(req.body)
    if (dataError) {
        return res.status(400).send({message: dataError.details[0].message})
    }

    try {
        const userData = await userModel.findOne({username: req.body.username.toString()})

        if (!userData) {
            return res.status(401).send({message: 'Usuario o contraseña inválida...'})
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password)

        if (!validPassword) {
            return res.status(401).send({message: 'Usuario o contraseña inválida...'})
        }

        res.status(200).send({userData: userData, message: 'Inicio de sesión exitoso...'})
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Error interno de servidor...'})
    }
})

module.exports = router