import fileExist from './fileExist'

const isImageExist = (filename?: string): boolean => {
  if (!filename) {
    return false
  }

  return fileExist(filename)
}

export default isImageExist
