const mongoose = require('mongoose')

const appSchema = new mongoose.Schema({
    type: String,
    name: String,
    steam_appid: Number,
    required_age: Number,
    is_free: Boolean,
    detailed_description: String,
    about_the_game: String,
    short_description: String,
    supported_languages: String,
    header_image: String,
    capsule_image: String,
    capsule_imagev5: String,
    website: String,
    pc_requirements: Object,
    mac_requirements: Object,
    linux_requirements: Object,
    developers: [String],
    publishers: [String],
    package_groups: [Object],
    platforms: Object,
    categories: [{id: Number, description: String}],
    genres: [{id: String, description: String}],
    screenshots: [Object],
    movies: [Object]
})

const appModel = mongoose.model("app", appSchema)

module.exports = {appModel}