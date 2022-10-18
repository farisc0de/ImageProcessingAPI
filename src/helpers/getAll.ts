import { promises as fs } from 'fs'
import foldersPaths from '../foldersPaths'

const getAll = async (): Promise<string[]> => {
  return (await fs.readdir(foldersPaths.fullpath)).map(
    (filename: string): string => filename.split('.')[0]
  )
}

export default getAll
