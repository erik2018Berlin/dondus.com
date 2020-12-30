import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Service } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, service

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  service = await Service.create({ userId: user })
})

test('POST /services 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, providerId: 'test', postcodes: 'test', title: 'test', description: 'test', serviceCategory: 'test', price: 'test', pictures: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.providerId).toEqual('test')
  expect(body.postcodes).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.serviceCategory).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.pictures).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /services 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /services 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /services/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${service.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(service.id)
})

test('GET /services/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /services/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${service.id}`)
    .send({ access_token: userSession, providerId: 'test', postcodes: 'test', title: 'test', description: 'test', serviceCategory: 'test', price: 'test', pictures: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(service.id)
  expect(body.providerId).toEqual('test')
  expect(body.postcodes).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.serviceCategory).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.pictures).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /services/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${service.id}`)
    .send({ access_token: anotherSession, providerId: 'test', postcodes: 'test', title: 'test', description: 'test', serviceCategory: 'test', price: 'test', pictures: 'test' })
  expect(status).toBe(401)
})

test('PUT /services/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${service.id}`)
  expect(status).toBe(401)
})

test('PUT /services/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, providerId: 'test', postcodes: 'test', title: 'test', description: 'test', serviceCategory: 'test', price: 'test', pictures: 'test' })
  expect(status).toBe(404)
})

test('DELETE /services/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${service.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /services/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${service.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /services/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${service.id}`)
  expect(status).toBe(401)
})

test('DELETE /services/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
