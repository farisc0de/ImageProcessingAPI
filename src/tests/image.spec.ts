import fs from 'fs'
import path from 'path'
import createThumb from '../helpers/createThumb'
import foldersPaths from '../foldersPaths'

it('Error: invalid width', async (): Promise<void> => {
  const error: boolean | null = await createThumb({
    filename: 'foo',
    width: '-50',
    height: '250',
  })

  expect(error).not.toBeNull()
})

it('Error: Image does not exist', async (): Promise<void> => {
  const error: boolean | null = await createThumb({
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

  let err: string | null = null

  if (
    !fs.existsSync(
      path.resolve(foldersPaths.thumbpath, 'icelandwaterfall_150_150.jpg')
    )
  ) {
    err = 'Error: File not created'
  }

  expect(err).toBeNull()
})
