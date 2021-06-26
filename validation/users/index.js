const Joi = require('joi');

const schemaCreateUser = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
    subscription: Joi.string().optional()
})

const schemaLoginUser = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
})

const validate = async (schema, obj, next) => {
    try {
       await schema.validateAsync(obj)
       next()
    }
    catch (err) {
        next({
            status: 400,
            message:  err.message,
        })
     }
}

module.exports = {
    validationCreateUser: (req, res, next) => {
        return validate(schemaCreateUser, req.body, next)
    },
    validationLoginUser: (req, res, next) => {
        return validate(schemaLoginUser, req.body, next)
    },
}
