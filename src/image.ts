import { promises as fs } from 'fs'
import path from 'path'
import process from './processor'
import pramters from './routes/helpers/interface'

export default class Image {
  static imagesFullPath = path.resolve(__dirname, 'images/full')
  static imagesThumbPath = path.resolve(__dirname, 'images/thumb')

  static async getImagePath(query: pramters): Promise<null | string> {
    if (!query.filename) {
      return null
    }
    const filePath: string =
      query.width && query.height
        ? path.resolve(
            Image.imagesThumbPath,
            `${query.filename}-${query.width}x${query.height}.jpg`
          )
        : path.resolve(Image.imagesFullPath, `${query.filename}.jpg`)

    try {
      await fs.access(filePath)
      return filePath
    } catch {
      return null
    }
  }

  static async isImageExist(filename?: string): Promise<boolean> {
    if (!filename) {
      return false
    }

    return (await Image.getImages()).includes(filename)
  }

  static async getImages(): Promise<string[]> {
    try {
      return (await fs.readdir(Image.imagesFullPath)).map(
        (filename: string): string => filename.split('.')[0]
      )
    } catch {
      return []
    }
  }

  static async isThumbExist(query: pramters): Promise<boolean> {
    if (!query.filename || !query.width || !query.height) {
      return false
    }

    const filePath: string = path.resolve(
      Image.imagesThumbPath,
      `${query.filename}-${query.width}x${query.height}.jpg`
    )

    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  static async createThumbPath(): Promise<void> {
    try {
      await fs.access(Image.imagesThumbPath)
    } catch {
      fs.mkdir(Image.imagesThumbPath)
    }
  }

  static async createThumb(query: pramters): Promise<null | string> {
    if (!query.filename || !query.width || !query.height) {
      return null
    }

    const filePathFull: string = path.resolve(
      Image.imagesFullPath,
      `${query.filename}.jpg`
    )
    const filePathThumb: string = path.resolve(
      Image.imagesThumbPath,
      `${query.filename}-${query.width}x${query.height}.jpg`
    )

    return await process(
      filePathFull,
      filePathThumb,
      parseInt(query.width),
      parseInt(query.height)
    )
  }
}
