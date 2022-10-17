import express from 'express'
import Image from './image'
import routes from './routes/index'

const app = express()

app.use(routes)

app.listen(3000, async (): Promise<void> => {
  await Image.createThumbPath()
})

export default app
