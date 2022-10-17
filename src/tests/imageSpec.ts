import { promises as fs } from 'fs'
import path from 'path'
import Image from '../image'

describe('Test image processing using sharp', (): void => {
  it('Error: invalid width', async (): Promise<void> => {
    const error: null | string = await Image.createThumb({
      filename: 'foo',
      width: '-50',
      height: '250',
    })
    expect(error).not.toBeNull()
  })

  it('Error: Image does not exist', async (): Promise<void> => {
    const error: null | string = await Image.createThumb({
      filename: 'my_face',
      width: '100',
      height: '500',
    })
    expect(error).not.toBeNull()
  })

  it('OK: Image resized', async (): Promise<void> => {
    await Image.createThumb({
      filename: 'icelandwaterfall',
      width: '150',
      height: '150',
    })

    const resizedImagePath: string = path.resolve(
      Image.imagesThumbPath,
      `icelandwaterfall-150x150.jpg`
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
    Image.imagesThumbPath,
    'icelandwaterfall-150x150'
  )

  try {
    await fs.access(resizedImagePath)
    fs.unlink(resizedImagePath)
  } catch {}
})
