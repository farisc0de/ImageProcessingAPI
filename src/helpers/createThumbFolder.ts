import { promises as fss } from 'fs'
import fs from 'fs'
import foldersPaths from '../foldersPaths'

const createThumbFolder = async (): Promise<void> => {
  if (fs.existsSync(foldersPaths.thumbpath)) {
    await fss.access(foldersPaths.thumbpath)
    return
  }

  fss.mkdir(foldersPaths.thumbpath)
}

export default createThumbFolder
