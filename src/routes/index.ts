import express from 'express'
import images from './images'

const routes: express.Router = express.Router()

routes.use('/images', images)

routes.get('/', (req, res): void => {
  res.send('{"message": "image_processing_api", "endpoint": "/images"}')
})

export default routes
