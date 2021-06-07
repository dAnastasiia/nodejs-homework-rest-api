const passport = require('passport')
const { Response } = require('./constants')
require('../config/passport')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        const headerAuth = req.get('Authorization')
        let token = null

        if(headerAuth){
            token = headerAuth.split(' ')[1]
        }

        if(err || !user || token !== user?.token){
            return res.json({ ...Response.unauthorized, message: 'Not authorized' })
        }

        req.user = user

        return next()
    })(req, res, next)
}

module.exports = guard