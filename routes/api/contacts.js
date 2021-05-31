const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {validationCreateContact, validationUpdateContact, validationUpdateStatusContact } = require('../../validation/validation')

router.get('/', ctrl.listContacts)
router.post('/', validationCreateContact, ctrl.addContact)

router.get('/:contactId', ctrl.getContactById)
router.delete('/:contactId', ctrl.removeContact)
router.put('/:contactId', validationUpdateContact, ctrl.updateContact)

router.patch('/:contactId/favorite', validationUpdateStatusContact, ctrl.updateStatusContact)

module.exports = router
