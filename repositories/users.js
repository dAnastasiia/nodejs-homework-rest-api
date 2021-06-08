const User = require('../model/user')

const findUserById = async (id) => {
    return await User.findById(id)
}

const findUserByEmail = async (email) => {
    return await User.findOne({email})
}

const createUser = async (body) => {
    const user = new User(body)
    return await user.save()
}

const updateUserToken = async (id, token) => {
    return await User.updateOne({_id: id}, {token})
}

const findUserByToken = async (token) => {
    return await User.findOne({token})
}

module.exports = {
    findUserById,
    findUserByEmail,
    createUser,
    updateUserToken,
    findUserByToken
}