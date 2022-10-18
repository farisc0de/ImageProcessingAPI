import supertest from 'supertest'
import app from '../index'
import { promises as fs } from 'fs'
import path from 'path'
import foldersPaths from '../foldersPaths'

const request = supertest(app)

it('gets /', async (): Promise<void> => {
  const response: supertest.Response = await request.get('/')
  expect(response.status).toBe(200)
})

it('gets /images', async (): Promise<void> => {
  const response: supertest.Response = await request.get('/images')
  expect(response.status).toBe(200)
})

it('gets /images?filename=icelandwaterfall&width=75&height=75', async (): Promise<void> => {
  const response: supertest.Response = await request.get(
    '/images?filename=icelandwaterfall&width=75&height=75'
  )
  expect(response.status).toBe(200)
})

it('gets /images?filename=icelandwaterfall&width=-100&height=200', async (): Promise<void> => {
  const response: supertest.Response = await request.get(
    '/images?filename=icelandwaterfall&width=-100&height=200'
  )
  expect(response.status).toBe(200)
})

it('gets /images?filename=icelandwaterfall', async (): Promise<void> => {
  const response: supertest.Response = await request.get(
    '/images?filename=icelandwaterfall'
  )
  expect(response.status).toBe(200)
})

it('Error: invalid endpoint', async (): Promise<void> => {
  const response: supertest.Response = await request.get('/image')
  expect(response.status).toBe(404)
})

afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    foldersPaths.thumbpath,
    'fjord-199x199.jpg'
  )

  await fs.access(resizedImagePath)
  fs.unlink(resizedImagePath)
})
