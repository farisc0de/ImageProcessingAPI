import pramters from '../routes/helpers/paramters'
import path from 'path'
import { promises as fss } from 'fs'
import foldersPaths from '../foldersPaths'
import fs from 'fs'

const isThumbExist = async (data: pramters): Promise<boolean> => {
  if (!data.filename || !data.width || !data.height) {
    return false
  }

  const filepath: string = path.resolve(
    foldersPaths.thumbpath,
    `${data.filename}_${data.width}_${data.height}.jpg`
  )

  if (!fs.existsSync(filepath)) {
    return false
  }

  await fss.access(filepath)
  return true
}

export default isThumbExist
