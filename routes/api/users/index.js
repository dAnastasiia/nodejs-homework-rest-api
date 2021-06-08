const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const {validationCreateUser, validationLoginUser} = require('../../../validation/users')


router.post('/signup', validationCreateUser, ctrl.signup)
router.post('/login', validationLoginUser, ctrl.login)
router.post('/logout', guard, ctrl.logout)
router.get('/current', guard, ctrl.current)

module.exports = router