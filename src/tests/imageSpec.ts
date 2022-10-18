import { promises as fs } from 'fs'
import path from 'path'
import createThumb from '../helpers/createThumb'
import foldersPaths from '../foldersPaths'

describe('Test Image using sharp', (): void => {
  it('Error: invalid width', async (): Promise<void> => {
    const error: null | string = await createThumb({
      filename: 'foo',
      width: '-50',
      height: '250',
    })
    expect(error).not.toBeNull()
  })

  it('Error: Image does not exist', async (): Promise<void> => {
    const error: null | string = await createThumb({
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
    let errorimage: null | string = ''

    try {
      await fs.access(resizedImagePath)
      errorimage = null
    } catch {
      errorimage = 'File was not created'
    }

    expect(errorimage).toBeNull()
  })
})

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    foldersPaths.thumbpath,
    'icelandwaterfall-150x150'
  )

  await fs.access(resizedImagePath)
  fs.unlink(resizedImagePath)
})
