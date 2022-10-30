import fs from 'fs'
import foldersPaths from '../foldersPaths'
import path from 'path'

const fileExist = (filename: string): boolean => {
  return fs.existsSync(path.resolve(foldersPaths.fullpath, `${filename}.jpg`))
}

export default fileExist
