import pramters from './paramters'
import isImageExist from '../../helpers/isImageExist'

const validate = async (query: pramters): Promise<null | string> => {
  if (!(await isImageExist(query.filename))) {
    return 'Please enter a valid filename'
  }

  if (!query.width && !query.height) {
    return null
  }

  const height: number = parseInt(`${query.height}`)
  if (Number.isNaN(height) || height < 1) {
    return 'Please provide a height'
  }

  const width: number = parseInt(`${query.width}`)
  if (Number.isNaN(width) || width < 1) {
    return 'Please provide a width'
  }

  return null
}

export default validate
