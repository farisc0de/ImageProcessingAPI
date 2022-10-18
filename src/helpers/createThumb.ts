import pramters from '../routes/helpers/interface'
import sharp from 'sharp'
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

  const filename = `${data.filename}-${data.width}x${data.height}.jpg`

  const thumbpath: string = path.resolve(foldersPaths.fullpath, filename)

  const width: number = parseInt(data.width)
  const height: number = parseInt(data.height)

  await sharp(fullpath).resize(width, height).toFormat('jpg').toFile(thumbpath)

  return 'true'
}

export default createThumb
