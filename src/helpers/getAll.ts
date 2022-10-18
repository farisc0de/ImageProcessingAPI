import { promises as fs } from 'fs'
import foldersPaths from '../foldersPaths'

const getAll = async (): Promise<string[]> => {
  try {
    return (await fs.readdir(foldersPaths.fullpath)).map(
      (filename: string): string => filename.split('.')[0]
    )
  } catch {
    return []
  }
}

export default getAll
