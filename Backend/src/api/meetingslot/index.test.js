import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Meetingslot } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, meetingslot

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  meetingslot = await Meetingslot.create({ userId: user })
})

test('POST /meetingslots 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, date: 'test', adress: 'test', bookingId: 'test', status: 'test', serviceId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.adress).toEqual('test')
  expect(body.bookingId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.serviceId).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /meetingslots 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /meetingslots 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].userId).toEqual('object')
})

test('GET /meetingslots 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /meetingslots/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${meetingslot.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(meetingslot.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /meetingslots/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${meetingslot.id}`)
  expect(status).toBe(401)
})

test('GET /meetingslots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /meetingslots/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${meetingslot.id}`)
    .send({ access_token: userSession, date: 'test', adress: 'test', bookingId: 'test', status: 'test', serviceId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(meetingslot.id)
  expect(body.date).toEqual('test')
  expect(body.adress).toEqual('test')
  expect(body.bookingId).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.serviceId).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /meetingslots/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${meetingslot.id}`)
    .send({ access_token: anotherSession, date: 'test', adress: 'test', bookingId: 'test', status: 'test', serviceId: 'test' })
  expect(status).toBe(401)
})

test('PUT /meetingslots/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${meetingslot.id}`)
  expect(status).toBe(401)
})

test('PUT /meetingslots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, date: 'test', adress: 'test', bookingId: 'test', status: 'test', serviceId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /meetingslots/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${meetingslot.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /meetingslots/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${meetingslot.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /meetingslots/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${meetingslot.id}`)
  expect(status).toBe(401)
})

test('DELETE /meetingslots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
