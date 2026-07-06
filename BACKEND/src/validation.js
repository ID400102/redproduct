const joi = require("joi")

function userValidation(body) {
    const userValidationSchema = joi.object({
        name : joi.string().min(2).max(30).trim().required(),
        email : joi.string().email().trim().required(),
        password : joi.string().min(8).max(12).trim().required()
    })

    return userValidationSchema.validate(body)
}

module.exports = userValidation