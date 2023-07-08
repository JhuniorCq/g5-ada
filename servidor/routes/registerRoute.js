const router = require('express').Router();
const {userModel, userDataValidation} = require('../dataSchemas/userSchema');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {dataError} = userDataValidation(req.body);
    if (dataError) {
        return res.status(400).send({message: dataError.details[0].message});
    }

    const {username, email, password} = req.body;

    try {
        if (username.length < 5) {
            return res.status(400).send({message: 'El nombre de usuario debe tener al menos 5 caracteres.'});
        }

        const userDataEmail = await userModel.findOne({email: email.toString()});
        if (userDataEmail) {
            return res.status(400).send({message: 'Este correo electrónico ya está registrado.'});
        }

        const userDataName = await userModel.findOne({username: username.toString()});
        if (userDataName) {
            return res.status(400).send({message: 'Este nombre de usuario ya está en uso.'});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const encryptedPass = await bcrypt.hash(password, salt);

        await new userModel({...req.body, password: encryptedPass}).save();

        res.status(201).send({message: 'Usuario registrado con éxito.'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error interno de servidor.'});
    }
});

module.exports = router;
