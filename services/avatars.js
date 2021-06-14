const jimp = require("jimp")
const path = require("path")
const fs = require("fs/promises")
const createFolderIsNotExist = require('../helpers/create-folder')

class AvatarsService {
  constructor(avatarsFolder) {
    this.avatarsFolder = avatarsFolder
  }

  async transformAvatar(pathFile) {
    const img = await jimp.read(pathFile)
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile)
  }

  async saveAvatar({userId, file}) {
    await this.transformAvatar(file.path)
    const userAvatarFolder = path.join(this.avatarsFolder, userId)
    await createFolderIsNotExist(userAvatarFolder)
    
    await fs.rename(file.path, path.join(userAvatarFolder, file.filename))

    return path.normalize(path.join(userId, file.filename))
  }
}

module.exports = AvatarsService;
