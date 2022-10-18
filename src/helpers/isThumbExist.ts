import pramters from '../routes/helpers/interface'
import path from 'path'
import { promises as fss } from 'fs'
import foldersPaths from '../foldersPaths'
import fs from 'fs'

const isThumbExist = async (data: pramters): Promise<boolean> => {
  if (!data.filename || !data.width || !data.height) {
    return false
  }

  const filePath: string = path.resolve(
    foldersPaths.thumbpath,
    `${data.filename}-${data.width}x${data.height}.jpg`
  )

  if (!fs.existsSync(filePath)) {
    return false
  }

  await fss.access(filePath)
  return true
}

export default isThumbExist
