const jwt = require('jsonwebtoken')
const path = require("path");
const fs = require("fs/promises");
require('dotenv').config()

const Users = require('../repositories/users')
const { HttpCode, Response } = require('../helpers/constants')
const AvatarsService = require('../services/avatars')
const EmailService = require('../services/email')
const {CreateSender} = require('../services/email-sender')

const SECRET_KEY = process.env.SECRET_KEY
const IMAGE_DIR = path.join(process.cwd(), process.env.IMAGE_DIR, process.env.USERS_AVATARS)

const signup = async (req, res, next) => {
    try {
      const user = await Users.findUserByEmail(req.body.email)

      if(user){
        return res.json({ ...Response.conflict, message: 'Email in use' })
      }

      const {email, subscription, avatarURL, verifyToken} = await Users.createUser(req.body)

      try {
        const emailService = new EmailService(process.env.NODE_ENV, new CreateSender())
        await emailService.sendVerifyEmail(verifyToken, email)

      } catch (e) {
        console.log(e.message)
      }

      return res.json({ ...Response.created, user: {email, subscription, avatarURL} })
    } catch (e) {
      next(e)
    }
}

const login = async (req, res, next) => {
    try {
      const user = await Users.findUserByEmail(req.body.email)
      const isValidPassword = await user?.isValidPassword(req.body.password)

      if(!user.verify){
        return res.json({ ...Response.conflict, message: 'Please check your email for verification letter' })
      }

      if(!user || !isValidPassword ){
        return res.json({ ...Response.unauthorized, message: 'Email or password is wrong' })
      }

      const id = user.id
      const payload = { id }
      const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
      await Users.updateUserToken(id, token)

      const {email, subscription} = user

      return res.json({ ...Response.ok, token, user: {email, subscription,} })
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

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const avatarService = new AvatarsService(IMAGE_DIR)
    const avatarURL = await avatarService.saveAvatar({userId: id, file: req.file})
    
    try {
      await fs.unlink(req.user.avatarURL)
    } catch (e) {
      console.log(e.message)
    }

    await Users.updateAvatar(id, avatarURL)
    return res.json({ ...Response.ok, user: { avatarURL: `http://localhost:3000/avatars/${avatarURL}` } })
  } catch (e) {
    console.log(e.message)
    next(e)
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await Users.findUserByVerifyToken(req.params.verificationToken)

    if(user){
      await Users.updateUserVerifyToken(user.id, true, null)
      
      return res.json({ ...Response.ok, message: 'Verification successful' })
    }
    
    return res.json({ ...Response.notFound, message: 'User not found'})
  } catch (e) {
    next(e)
  }
  
}

const repeatVerificationEmail = async (req, res, next) => {
  try {
    const user = await Users.findUserByEmail(req.body.email)

    if(user){
      const { email, verify, verifyToken } = user

      if(!verify){
        const emailService = new EmailService(process.env.NODE_ENV, new CreateSender())
        await emailService.sendVerifyEmail(verifyToken, email)

        return res.json({ ...Response.ok, message: 'Verification email sent' })
      }

      return res.json({ ...Response.conflict, message: 'Email in use' })
    }

    return res.json({ ...Response.badRequest, message: 'Verification has already been passed' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
    signup,
    login,
    logout,
    current,
    avatars,
    verify,
    repeatVerificationEmail
}