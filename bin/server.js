const app = require('../app')
const db = require('../model/db')
const createFolderIsNotExist = require('../helpers/create-folder')
const path = require("path");
require('dotenv').config()

const PORT = process.env.PORT || 3000
const UPLOAD_DIR = process.env.UPLOAD_DIR
const IMAGE_DIR = process.env.IMAGE_DIR
const USERS_AVATARS = process.env.USERS_AVATARS

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(path.join(process.cwd(), UPLOAD_DIR))
    await createFolderIsNotExist(path.join(process.cwd(), IMAGE_DIR))
    await createFolderIsNotExist(path.join(IMAGE_DIR, USERS_AVATARS))
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(e =>{
  console.log(`Error: ${e.message}`)
})


