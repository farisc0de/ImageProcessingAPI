import pramters from '../routes/helpers/interface'
import path from 'path'
import { promises as fss } from 'fs'
import fs from 'fs'
import foldersPaths from '../foldersPaths'

const getImagePath = async (data: pramters): Promise<null | string> => {
  if (!data.filename) {
    return null
  }
  const filePath: string =
    data.width && data.height
      ? path.resolve(
          foldersPaths.thumbpath,
          `${data.filename}-${data.width}x${data.height}.jpg`
        )
      : path.resolve(foldersPaths.fullpath, `${data.filename}.jpg`)

  if (fs.existsSync(filePath)) {
    await fss.access(filePath)
    return filePath
  }

  return null
}

export default getImagePath
