import express from 'express'
import isThumbExist from '../helpers/isThumbExist'
import createThumb from '../helpers/createThumb'
import getImagePath from '../helpers/getImagePath'
import validate from './helpers/validate'

const images: express.Router = express.Router()

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const validatemessage: string | null = await validate(req.query)

    if (validatemessage) {
      res.send(validatemessage)
      return
    }

    let error: boolean | null = false

    if (!(await isThumbExist(req.query))) {
      error = await createThumb(req.query)
    }

    if (error) {
      res.send(error)
      return
    }

    const path: string | null = await getImagePath(req.query)

    if (!path) {
      res.send('Error: Please try again')
      return
    }

    res.sendFile(path)
  }
)

export default images
