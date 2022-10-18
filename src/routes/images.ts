import express from 'express'
import isThumbExist from '../helpers/isThumbExist'
import createThumb from '../helpers/createThumb'
import getImagePath from '../helpers/getImagePath'
import validate from './helpers/validate'

const images: express.Router = express.Router()

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const validationMessage: null | string = await validate(req.query)
    if (validationMessage) {
      res.send(validationMessage)
      return
    }

    let error: null | string = ''

    if (!(await isThumbExist(req.query))) {
      error = await createThumb(req.query)
    }

    if (error) {
      res.send(error)
      return
    }

    const path: null | string = await getImagePath(req.query)
    if (path) {
      res.sendFile(path)
    } else {
      res.send('Error: Please try again')
    }
  }
)

export default images
