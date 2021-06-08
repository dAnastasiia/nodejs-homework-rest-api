const Contact = require('../model/contact')

const listContacts = async (userId) => {
  const result = await Contact.find({ owner: userId})
  return result
}

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndDelete({_id: contactId, owner: userId})
  return result
}

const addContact = async (userId, body) => {
  const result = await Contact.create({ owner: userId, ...body })
  return result
}

const updateContact = async (userId,contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId, owner: userId},
    { ...body},
    {new: true})

  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}