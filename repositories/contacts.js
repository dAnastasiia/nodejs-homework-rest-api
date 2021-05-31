const Contact = require('../model/contact')

const listContacts = async () => {
  const result = await Contact.find()
  return result
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId })
  return result
}

const removeContact = async (contactId) => {
  const result = await Contact.findOneAndDelete({_id: contactId})
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId},
    { ...body},
    {new: true})

  return result
}

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {_id: contactId},
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
  updateStatusContact
}

// const { ObjectId } = require('mongodb')
// const db = require('./db')

// const getCollection = async (db, name) => {
//   const client = await db
//   const collection = await client.db().collection(name)
//   return collection
// }

// const listContacts = async () => {
//   const collection = await getCollection(db, 'contacts')
//   const result = await collection.find({}).toArray()
//   return result
// }

// const getContactById = async (contactId) => {
//   const collection = await getCollection(db, 'contacts')
//   const objId = new ObjectId(contactId)

//   const [result] = await collection.find({ _id: objId }).toArray()
//   return result
// }

// const removeContact = async (contactId) => {
//   const collection = await getCollection(db, 'contacts')
//   const objId = new ObjectId(contactId)

//   const {value: result} = await collection.findOneAndDelete({_id: objId})

//   return result
// }

// const addContact = async (body) => {
//   const collection = await getCollection(db, 'contacts')
//   const record ={
//     ...body,
//     ...(body.favorite ? {} : {favorite: false})
//   }
//   const {ops: [result]} = await collection.insertOne(record)
//   return result
// }

// const updateContact = async (contactId, body) => {
//   const collection = await getCollection(db, 'contacts')
//   const objId = new ObjectId(contactId)

//   const {value: result} = await collection.findOneAndUpdate(
//     {_id: objId},
//     {$set: body},
//     {returnOriginal: false})

//   return result
// }

// const updateStatusContact = async (contactId, body) => {
//   const collection = await getCollection(db, 'contacts')
//   const objId = new ObjectId(contactId)

//   const {value: result} = await collection.findOneAndUpdate(
//     {_id: objId},
//     {$set: body},
//     {returnOriginal: false})

//   return result
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
//   updateStatusContact
// }
