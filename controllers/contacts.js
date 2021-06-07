const Contacts = require('../repositories/contacts')
const { Response } = require('../helpers/constants')

const listContacts = async (req, res, next) => {
    try {
      const contacts = await Contacts.listContacts()
      return res.json({ ...Response.ok, contacts })
    } catch (e) {
      next(e)
    }
}
  
const getContactById = async (req, res, next) => {
    try {
      const contact = await Contacts.getContactById(req.params.contactId)
  
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
      const contact = await Contacts.addContact(req.body)
      res.status(201).json({ ...Response.created, contact })
    } catch (e) {
      next(e)
    }
}
  
const removeContact = async (req, res, next) => {
    try {
      const contact = await Contacts.removeContact(req.params.contactId)
  
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
      const body = Object.keys(req.body).length
      if(body === 0){        
        return res.json({ ...Response.badRequest, message: "missing fields"})
      }
  
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
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
      const body = Object.keys(req.body).length
      if(body === 0){
        return res.json({ ...Response.badRequest, message: "missing field `favorite`"})
      }
  
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
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