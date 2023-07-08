const {userModel} = require("../dataSchemas/userSchema");
const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        const user = await userModel.findOne({username: req.query.username});

        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        const gameLibrary = user.gameLibrary;

        res.json({gameLibrary});
    } catch (error) {
        console.error('Error al obtener el objeto gameLibrary:', error);
        res.status(500).json({message: 'Error al obtener el objeto gameLibrary'});
    }
});

module.exports = router