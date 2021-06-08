const Users = require('../repositories/users')
const { HttpCode, Response } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

const signup = async (req, res, next) => {
    try {
      const user = await Users.findUserByEmail(req.body.email)

      if(user){
        return res.json({ ...Response.conflict, message: 'Email in use' })
      }

      const {email, subscription} = await Users.createUser(req.body)

      return res.json({ ...Response.created, user: {email, subscription} })
    } catch (e) {
      next(e)
    }
}

const login = async (req, res, next) => {
    try {
      const user = await Users.findUserByEmail(req.body.email)
      const isValidPassword = await user?.isValidPassword(req.body.password)

      if(!user || !isValidPassword){
        return res.json({ ...Response.unauthorized, message: 'Email or password is wrong' })
      }

      const id = user.id
      const payload = { id }
      const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
      await Users.updateUserToken(id, token)

      const {email, subscription} = user

      return res.json({ ...Response.ok, token, user: {email, subscription} })
    } catch (e) {
      next(e)
    }
}

const logout = async (req, res, next) => {
  const id = req.user.id
    try {
      await Users.updateUserToken(id, null)
      return res.status(HttpCode.NO_CONTENT).json({})
    } catch (e) {
      next(e)
    }
}

const current = async (req, res, next) => {
  try {
    const token = req.user.token
    const user = await Users.findUserByToken(token)

    if(user){
      const {email, subscription} = user
      
      return res.json({ ...Response.ok, user: {email, subscription} })
    }
    
    return res.json({ ...Response.unauthorized, message: 'Not authorized' })
    
  } catch (e) {
    next(e)
  }
}

module.exports = {
    signup,
    login,
    logout,
    current
}