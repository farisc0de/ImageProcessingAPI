import sharp from 'sharp'

const process = async (
  source: string,
  dist: string,
  width: number,
  height: number
): Promise<null | string> => {
  try {
    await sharp(source).resize(width, height).toFormat('jpg').toFile(dist)
  } catch (error) {}
  return null
}

export default process
