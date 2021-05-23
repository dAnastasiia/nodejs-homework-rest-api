const fs = require('fs/promises')
const path = require('path')
const {v4 : uuid} = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const readData = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(data)
}

const listContacts = async () => {
  return await readData()
}

const getContactById = async (contactId) => {
  const data = await readData()
  const result = data.find(({id}) => id.toString() === contactId)
  return result
}

const removeContact = async (contactId) => {
  const data = await readData()
 
  const removedContactPosition = data.indexOf(data.find(({id}) => id.toString() === contactId))

  if(removedContactPosition !== -1){
    const removedContact = data.splice(removedContactPosition, 1)
    await fs.writeFile(contactsPath, JSON.stringify(data))

    return removedContact
  }

  return null
}

const addContact = async (body) => {
  const id = uuid()
  const record ={
    id,
    ...body
  }

  const data = await readData()

  data.push(record)
  await fs.writeFile(contactsPath, JSON.stringify(data))

  return record
}

const updateContact = async (contactId, body) => {
  const data = await readData()
  const result = data.find(({id}) => id.toString() === contactId)

  if(result){
    Object.assign(result, body)
    await fs.writeFile(contactsPath, JSON.stringify(data))
  }

  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
