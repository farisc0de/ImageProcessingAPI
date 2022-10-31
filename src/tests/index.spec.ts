import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

it('gets /', async (): Promise<void> => {
  const response: supertest.Response = await request.get('/')
  expect(response.status).toBe(200)
})

it('gets /images', async (): Promise<void> => {
  const response: supertest.Response = await request.get('/images')
  expect(response.status).toBe(200)
})

// Image Resized (:
it('gets /images?filename=icelandwaterfall&width=75&height=75', async (): Promise<void> => {
  const response: supertest.Response = await request.get(
    '/images?filename=icelandwaterfall&width=75&height=75'
  )
  expect(response.status).toBe(200)
})

// Image Viewd (:
it('gets /images?filename=icelandwaterfall', async (): Promise<void> => {
  const response: supertest.Response = await request.get(
    '/images?filename=icelandwaterfall'
  )
  expect(response.status).toBe(200)
})

// Invalid Endpoint ):
it('Error: invalid endpoint', async (): Promise<void> => {
  const response: supertest.Response = await request.get('/image')
  expect(response.status).toBe(404)
})
