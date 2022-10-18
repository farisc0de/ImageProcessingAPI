import getAll from './getAll'

const isImageExist = async (filename?: string): Promise<boolean> => {
  if (!filename) {
    return false
  }

  return (await getAll()).includes(filename)
}

export default isImageExist
