import pramters from '../routes/helpers/paramters'
import sharp from 'sharp'
import path from 'path'
import foldersPaths from '../foldersPaths'
import fs from 'fs'

const createThumb = async (data: pramters): Promise<null | boolean> => {
  if (!data.filename || !data.width || !data.height) {
    return null
  }

  const fullpath: string = path.resolve(
    foldersPaths.fullpath,
    `${data.filename}.jpg`
  )

  if (!fs.existsSync(fullpath)) {
    return false
  }

  const filename: string = `${data.filename}_${data.width}_${data.height}.jpg`
  const thumbpath: string = path.resolve(foldersPaths.thumbpath, filename)

  await sharp(fullpath)
    .resize(parseInt(data.width), parseInt(data.height))
    .toFormat('jpg')
    .toFile(thumbpath)

  return true
}

export default createThumb
