import express from 'express'
import isThumbExist from '../helpers/isThumbExist'
import createThumb from '../helpers/createThumb'
import getImagePath from '../helpers/getImagePath'
import validate from './helpers/validate'

const images: express.Router = express.Router()

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (await validate(req.query)) {
      res.send(await validate(req.query))
      return
    }

    if (await isThumbExist(req.query)) {
      const path: string | null = await getImagePath(req.query)
      if (path) {
        res.sendFile(path)
        return
      }
    }

    await createThumb(req.query)

    if (!(await isThumbExist(req.query))) {
      res.send('Error: Failed to create a file !')
      return
    }

    const path: string | null = await getImagePath(req.query)

    if (!path) {
      res.send('Error: Please try again')
      return
    }

    res.sendFile(path)

    return
  }
)

export default images
