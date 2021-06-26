const { Schema, model,} = require('mongoose')
const gravatar = require('gravatar')
const {Subscription} = require('../helpers/constants')
const bcrypt = require('bcryptjs')
const {v4 : uuid} = require('uuid')
const SALT_WORK_FACTOR = 8

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
      },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
        default: Subscription.STARTER
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        default: function () {
            return gravatar.url(this.email, {s: '250'}, true)
        }
    },
    verify: {
        type: Boolean,
        default: false,
      },
    verifyToken: {
        type: String,
        required: [true, 'Verify token is required'],
        default: uuid()
    },
}, { versionKey: false, timestamps: true})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        const salt = await bcrypt.genSaltSync(SALT_WORK_FACTOR)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User