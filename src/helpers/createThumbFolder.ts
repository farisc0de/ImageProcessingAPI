import { promises as fs } from 'fs'
import foldersPaths from '../foldersPaths'

const createThumbFolder = async (): Promise<void> => {
  try {
    await fs.access(foldersPaths.thumbpath)
  } catch {
    fs.mkdir(foldersPaths.thumbpath)
  }
}

export default createThumbFolder
