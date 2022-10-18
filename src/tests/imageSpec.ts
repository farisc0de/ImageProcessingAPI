import { promises as fss } from 'fs'
import fs from 'fs'
import path from 'path'
import createThumb from '../helpers/createThumb'
import foldersPaths from '../foldersPaths'

it('Error: invalid width', async (): Promise<void> => {
  const error: string | null = await createThumb({
    filename: 'foo',
    width: '-50',
    height: '250',
  })
  expect(error).not.toBeNull()
})

it('Error: Image does not exist', async (): Promise<void> => {
  const error: string | null = await createThumb({
    filename: 'my_face',
    width: '100',
    height: '500',
  })
  expect(error).not.toBeNull()
})

it('OK: Image resized', async (): Promise<void> => {
  await createThumb({
    filename: 'icelandwaterfall',
    width: '150',
    height: '150',
  })

  const resizedImagePath: string = path.resolve(
    foldersPaths.fullpath,
    'icelandwaterfall-150x150.jpg'
  )
  let err: string | null = ''

  if (fs.existsSync(resizedImagePath)) {
    await fss.access(resizedImagePath)
    err = null
  } else {
    err = 'Error: File not created'
  }

  expect(err).toBeNull()
})

afterAll(async (): Promise<void> => {
  const resizedimage: string = path.resolve(
    foldersPaths.thumbpath,
    'icelandwaterfall-150x150'
  )

  await fss.access(resizedimage)
  fss.unlink(resizedimage)
})
