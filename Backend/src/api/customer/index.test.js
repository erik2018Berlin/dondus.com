import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Customer } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, customer

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  customer = await Customer.create({ user })
})

test('POST /customers 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, street: 'test', number: 'test', postcode: 'test', bankInformation: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.street).toEqual('test')
  expect(body.number).toEqual('test')
  expect(body.postcode).toEqual('test')
  expect(body.bankInformation).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /customers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /customers 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /customers/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${customer.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(customer.id)
})

test('GET /customers/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /customers/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${customer.id}`)
    .send({ access_token: userSession, street: 'test', number: 'test', postcode: 'test', bankInformation: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(customer.id)
  expect(body.street).toEqual('test')
  expect(body.number).toEqual('test')
  expect(body.postcode).toEqual('test')
  expect(body.bankInformation).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /customers/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${customer.id}`)
    .send({ access_token: anotherSession, street: 'test', number: 'test', postcode: 'test', bankInformation: 'test' })
  expect(status).toBe(401)
})

test('PUT /customers/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${customer.id}`)
  expect(status).toBe(401)
})

test('PUT /customers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, street: 'test', number: 'test', postcode: 'test', bankInformation: 'test' })
  expect(status).toBe(404)
})

test('DELETE /customers/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${customer.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /customers/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${customer.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /customers/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${customer.id}`)
  expect(status).toBe(401)
})

test('DELETE /customers/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
