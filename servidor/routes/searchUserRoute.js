const router = require('express').Router();
const {userModel} = require('../dataSchemas/userSchema');

router.get('/', async (req, res) => {
    const username = req.query.username;

    try {
        userModel.find({username: {$regex: username, $options: 'i'}}).then((userData) => {
            if (userData.length > 0) {
                res.status(200).send(userData);
            } else {
                res.status(400).send({message: 'No se encontraron usuarios con ese nombre de usuario.'});
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Error interno de servidor.'});
    }
});

module.exports = router;
