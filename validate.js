const Joi = require('joi');

const registerValidation = (data)=> {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email()
        })
    return schema.validate(data)
}

const loginValidation = (data)=> {
    const schema = Joi.object({        
        password: Joi.string().required(),
        email: Joi.string().email().required()
        })
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;