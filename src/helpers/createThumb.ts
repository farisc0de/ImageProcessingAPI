import pramters from '../routes/helpers/interface'
import resizeImage from '../processor'
import path from 'path'
import foldersPaths from '../foldersPaths'

const createThumb = async (data: pramters): Promise<null | string> => {
  if (!data.filename || !data.width || !data.height) {
    return null
  }

  const fullpath: string = path.resolve(
    foldersPaths.fullpath,
    `${data.filename}.jpg`
  )

  const thumbpath: string = path.resolve(
    foldersPaths.fullpath,
    `${data.filename}-${data.width}x${data.height}.jpg`
  )

  return await resizeImage(
    fullpath,
    thumbpath,
    parseInt(data.width),
    parseInt(data.height)
  )
}

export default createThumb
