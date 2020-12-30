import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Provider } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, provider

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  provider = await Provider.create({})
})

test('POST /providers 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, userId: 'test', serviceIds: 'test', bankAccount: 'test', calendarIds: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.userId).toEqual('test')
  expect(body.serviceIds).toEqual('test')
  expect(body.bankAccount).toEqual('test')
  expect(body.calendarIds).toEqual('test')
})

test('POST /providers 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /providers 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /providers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /providers 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /providers/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${provider.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(provider.id)
})

test('GET /providers/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /providers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${provider.id}`)
    .send({ access_token: userSession, userId: 'test', serviceIds: 'test', bankAccount: 'test', calendarIds: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(provider.id)
  expect(body.userId).toEqual('test')
  expect(body.serviceIds).toEqual('test')
  expect(body.bankAccount).toEqual('test')
  expect(body.calendarIds).toEqual('test')
})

test('PUT /providers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${provider.id}`)
  expect(status).toBe(401)
})

test('PUT /providers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, userId: 'test', serviceIds: 'test', bankAccount: 'test', calendarIds: 'test' })
  expect(status).toBe(404)
})

test('DELETE /providers/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${provider.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /providers/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${provider.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /providers/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${provider.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /providers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${provider.id}`)
  expect(status).toBe(401)
})

test('DELETE /providers/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
