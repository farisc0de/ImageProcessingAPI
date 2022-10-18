import sharp from 'sharp'

const resizeImage = async (
  source: string,
  dist: string,
  width: number,
  height: number
): Promise<null | string> => {
  try {
    await sharp(source).resize(width, height).toFormat('jpg').toFile(dist)
  } catch (error) {
    return 'Error: couldn not resize image'
  }
  return null
}

export default resizeImage
