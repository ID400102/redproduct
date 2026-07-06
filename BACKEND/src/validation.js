const joi = require("joi")

function userValidation(body) {
    const userValidationSignUp = joi.object({
        name : joi.string().min(2).max(30).trim().required(),
        email : joi.string().email().trim().required(),
        password : joi.string().min(8).max(12).trim().required()
    });

    const userValidationLogin = joi.object({
        email : joi.string().email().trim().required(),
        password : joi.string().min(8).max(12).trim().required()
    })

    return {
            userValidationSignUp : userValidationSignUp.validate(body),
            userValidationLogin : userValidationLogin.validate(body)
        }
    
}

module.exports = userValidation