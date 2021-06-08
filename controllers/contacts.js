const Contacts = require('../repositories/contacts')
const { Response } = require('../helpers/constants')

const listContacts = async (req, res, next) => {
  try {
      const userId = req.user.id
      const contacts = await Contacts.listContacts(userId)
      return res.json({ ...Response.ok, contacts })
    } catch (e) {
      next(e)
    }
}
  
const getContactById = async (req, res, next) => {
    try {
      const userId = req.user.id
      const contact = await Contacts.getContactById(userId, req.params.contactId)
  
      if(contact){
        return res.json({ ...Response.ok, contact })
      }
  
      return res.json(Response.notFound)
    } catch (e) {
      next(e)
    }
}
  
const addContact =  async (req, res, next) => {
    try {
      const userId = req.user.id
      const contact = await Contacts.addContact(userId, req.body)
      return res.json({ ...Response.created, contact })
    } catch (e) {
      next(e)
    }
}
  
const removeContact = async (req, res, next) => {
    try {
      const userId = req.user.id
      const contact = await Contacts.removeContact(userId, req.params.contactId)
  
      if(contact){
        return res.json({ ...Response.ok, message: "contact deleted", contact})
      }
  
      return res.json(Response.notFound)
    } catch (e) {
      next(e)
    }
}
  
const updateContact = async (req, res, next) => {
    try {
      const userId = req.user.id
      const body = Object.keys(req.body).length
      if(body === 0){        
        return res.json({ ...Response.badRequest, message: "missing fields"})
      }
  
      const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
      if(contact){
        return res.json({ ...Response.ok, message: "contact updated", contact})
      }
  
      return res.json(Response.notFound)
    } catch (e) {
      next(e)
    }
}
  
const updateStatusContact = async (req, res, next) => {
    try {
      const userId = req.user.id
      const body = Object.keys(req.body).length
      if(body === 0){
        return res.json({ ...Response.badRequest, message: "missing field `favorite`"})
      }
  
      const contact = await Contacts.updateContact(userId, req.params.contactId, req.body)
      if(contact){
        return res.json({ ...Response.ok, message: "contact status updated", contact})
      }
  
      return res.json(Response.notFound)
    } catch (e) {
      next(e)
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}