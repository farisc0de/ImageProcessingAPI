import express from 'express'
import createThumbFolder from './helpers/createThumbFolder'
import routes from './routes/index'

const app: express.Application = express()

app.use(routes)

app.listen(3000, async (): Promise<void> => {
  await createThumbFolder()
})

export default app
