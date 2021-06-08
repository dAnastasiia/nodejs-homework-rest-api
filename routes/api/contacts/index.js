const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/contacts')
const guard = require('../../../helpers/guard')
const {validationCreateContact, validationUpdateContact, validationUpdateStatusContact } = require('../../../validation/contacts')

router.get('/', guard, ctrl.listContacts)
router.post('/', guard, validationCreateContact, ctrl.addContact)

router.get('/:contactId', guard, ctrl.getContactById)
router.delete('/:contactId', guard, ctrl.removeContact)
router.put('/:contactId', guard, validationUpdateContact, ctrl.updateContact)

router.patch('/:contactId/favorite', guard, validationUpdateStatusContact, ctrl.updateStatusContact)

module.exports = router
