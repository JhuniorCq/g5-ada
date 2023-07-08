const router = require('express').Router();
const {userModel} = require('../dataSchemas/userSchema');

router.post('/', async (req, res) => {
    const newAppsData = req.body.apps;

    try {
        // Buscar el usuario en la base de datos
        const user = await userModel.findOne({username: req.body.username});

        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        // Verificar si ya existe un objeto duplicado en apps
        const duplicates = newAppsData.filter((newApp) => {
            return user.gameLibrary.some((existingApp) => existingApp.steam_appid === newApp.steam_appid);
        });

        if (duplicates.length > 0) {
            return res.status(400).json({message: `${duplicates[0].name} ya está en tu biblioteca...`});
        }

        // Agregar los nuevos objetos de apps al usuario
        user.gameLibrary.push(...newAppsData);

        // Guardar los cambios en la base de datos
        await user.save();

        // Responder con el usuario actualizado
        res.json({message: 'Nuevos objetos de apps añadidos al usuario', user});
    } catch (error) {
        // Manejar el error de manera adecuada
        console.error(error);
        res.status(500).json({message: 'Error al buscar o guardar el usuario'});
    }
});

module.exports = router;
