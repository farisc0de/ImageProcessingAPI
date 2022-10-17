import express from 'express'
import Image from '../image'
import validate from './helpers/validate'

const images = express.Router()

images.get('/', async (req, res): Promise<void> => {
  const validationMessage: null | string = await validate(req.query)
  if (validationMessage) {
    res.send(validationMessage)
    return
  }

  let error: null | string = ''

  if (!(await Image.isThumbExist(req.query))) {
    error = await Image.createThumb(req.query)
  }

  if (error) {
    res.send(error)
    return
  }

  const path: null | string = await Image.getImagePath(req.query)
  if (path) {
    res.sendFile(path)
  } else {
    res.send('Error: Please try again')
  }
})

export default images
