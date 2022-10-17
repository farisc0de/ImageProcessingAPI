import supertest from 'supertest'
import app from '../index'
import { promises as fs } from 'fs'
import path from 'path'
import Image from '../image'

const request = supertest(app)

describe('Test API Endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response = await request.get('/')

      expect(response.status).toBe(200)
    })
  })

  describe('endpoint: /images', (): void => {
    it('gets /images?filename=icelandwaterfall', async (): Promise<void> => {
      const response = await request.get('/images?filename=icelandwaterfall')

      expect(response.status).toBe(200)
    })

    it('gets /images?filename=icelandwaterfall&width=75&height=75', async (): Promise<void> => {
      const response = await request.get(
        '/images?filename=icelandwaterfall&width=75&height=75'
      )

      expect(response.status).toBe(200)
    })

    it('gets /images?filename=icelandwaterfall&width=-100&height=200', async (): Promise<void> => {
      const response = await request.get(
        '/images?filename=icelandwaterfall&width=-100&height=200'
      )

      expect(response.status).toBe(200)
    })

    it('gets /images', async (): Promise<void> => {
      const response = await request.get('/images')

      expect(response.status).toBe(200)
    })
  })

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response = await request.get('/foo')

      expect(response.status).toBe(404)
    })
  })
})

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    Image.imagesThumbPath,
    'fjord-199x199.jpg'
  )

  try {
    await fs.access(resizedImagePath)
    fs.unlink(resizedImagePath)
  } catch {}
})