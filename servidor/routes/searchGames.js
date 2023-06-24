const { appModel } = require("../dataSchemas/appSchema");
const router = require('express').Router();

router.get('/', async (req, res) => {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 20;

    try {
        const skip = (page - 1) * limit;

        const count = await appModel.countDocuments({ name: { $regex: query, $options: 'i' } });
        const totalPages = Math.ceil(count / limit);

        const apps = await appModel.find({ name: { $regex: query, $options: 'i' } })
            .skip(skip)
            .limit(limit);

        res.json({ apps, totalPages });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
    }
});

module.exports = router;
