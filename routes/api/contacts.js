const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {validationCreateContact, validationUpdateContact, validationUpdateStatusContact } = require('../validation')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validationCreateContact, ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', validationUpdateContact, ctrl.updateContact)

router.patch('/:contactId/favorite', validationUpdateStatusContact, ctrl.updateStatusContact)

// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await Contacts.listContacts()
//     res.json({ status: 'success', code: 200, contacts })
//   } catch (e) {
//     next(e)
//   }
// })

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const contact = await Contacts.getContactById(req.params.contactId)

//     if(contact){
//       return res.json({ status: 'success', code: 200, contact })
//     }

//     return res.json({ status: 'error', code: 404, message: 'Not found'  })
//   } catch (e) {
//     next(e)
//   }
// })

// router.post('/', validationCreateContact, async (req, res, next) => {
//   try {
//     const contact = await Contacts.addContact(req.body)
//     res.status(201).json({ status: 'success', code: 201, contact })
//   } catch (e) {
//     next(e)
//   }
// })

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const contact = await Contacts.removeContact(req.params.contactId)

//     if(contact){
//       return res.json({ status: 'success', code: 200, message: "contact deleted", contact})
//     }

//     return res.json({ status: 'error', code: 404, message: 'Not found'  })
//   } catch (e) {
//     next(e)
//   }
// })

// router.put('/:contactId', validationUpdateContact, async (req, res, next) => {
//   try {
//     const body = Object.keys(req.body).length
//     if(body === 0){
//       return res.status(400).json({ status: 'error', code: 400, message: "missing fields"})
//     }

//     const contact = await Contacts.updateContact(req.params.contactId, req.body)
//     if(contact){
//       return res.json({ status: 'success', code: 200, message: "contact updated", contact})
//     }

//     return res.json({ status: 'error', code: 404, message: 'Not found'  })
//   } catch (e) {
//     next(e)
//   }
// })

// router.patch('/:contactId/favorite', validationUpdateStatusContact, async (req, res, next) => {
//   try {
//     const body = Object.keys(req.body).length
//     if(body === 0){
//       return res.status(400).json({ status: 'error', code: 400, message: "missing field `favorite`"})
//     }

//     const contact = await Contacts.updateStatusContact(req.params.contactId, req.body)
//     if(contact){
//       return res.json({ status: 'success', code: 200, message: "contact status updated", contact})
//     }

//     return res.json({ status: 'error', code: 404, message: 'Not found'  })
//   } catch (e) {
//     next(e)
//   }
// })

module.exports = router
