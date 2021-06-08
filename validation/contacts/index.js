const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    favorite: Joi.boolean().optional()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    favorite: Joi.boolean().optional()
}).min(1)

const schemaUpdateStatusContact = Joi.object({
    favorite: Joi.boolean().required()
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
    validationCreateContact: (req, res, next) => {
        return validate(schemaCreateContact, req.body, next)
    },
    validationUpdateContact: (req, res, next) => {
        return validate(schemaUpdateContact, req.body, next, "missing fields")
    },
    validationUpdateStatusContact:(req, res, next) => {
        return validate(schemaUpdateStatusContact, req.body, next, "missing field favorite")
    },
}
