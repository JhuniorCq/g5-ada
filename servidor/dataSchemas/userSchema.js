const mongoose = require('mongoose')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    displayname: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    description: {type: String},
    avatar: {type: String},
    gameLibrary: {type: Array, default: []}
})

const userModel = mongoose.model("user", userSchema)

const userDataValidation = (data) => {
    const Schema = joi.object({
        username: joi.string().required().label('Username'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    })
    return Schema.validate(data)
}

module.exports = {userModel, userDataValidation}