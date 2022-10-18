import pramters from '../routes/helpers/interface'
import path from 'path'
import { promises as fs } from 'fs'
import foldersPaths from '../foldersPaths'

const isThumbExist = async (data: pramters): Promise<boolean> => {
  if (!data.filename || !data.width || !data.height) {
    return false
  }

  const filePath: string = path.resolve(
    foldersPaths.thumbpath,
    `${data.filename}-${data.width}x${data.height}.jpg`
  )

  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

export default isThumbExist
