import Image from '../../image'
import pramters from './interface'

const validate = async (query: pramters): Promise<null | string> => {
  if (!(await Image.isImageExist(query.filename))) {
    return `Please enter a valid filename.`
  }

  if (!query.width && !query.height) {
    return null
  }

  const width: number = parseInt(query.width || '')
  if (Number.isNaN(width) || width < 1) {
    return 'Please provide a positive number.'
  }

  const height: number = parseInt(query.height || '')
  if (Number.isNaN(height) || height < 1) {
    return 'Please provide a positive number.'
  }

  return null
}

export default validate
