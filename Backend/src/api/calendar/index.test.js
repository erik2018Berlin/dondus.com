import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Calendar } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, calendar

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  calendar = await Calendar.create({ userId: user })
})

test('POST /calendars 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', notes: 'test', meetingSlots: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.meetingSlots).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /calendars 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /calendars 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].userId).toEqual('object')
})

test('GET /calendars 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /calendars/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${calendar.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(calendar.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /calendars/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${calendar.id}`)
  expect(status).toBe(401)
})

test('GET /calendars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /calendars/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${calendar.id}`)
    .send({ access_token: userSession, name: 'test', notes: 'test', meetingSlots: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(calendar.id)
  expect(body.name).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.meetingSlots).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /calendars/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${calendar.id}`)
    .send({ access_token: anotherSession, name: 'test', notes: 'test', meetingSlots: 'test' })
  expect(status).toBe(401)
})

test('PUT /calendars/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${calendar.id}`)
  expect(status).toBe(401)
})

test('PUT /calendars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', notes: 'test', meetingSlots: 'test' })
  expect(status).toBe(404)
})

test('DELETE /calendars/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${calendar.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /calendars/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${calendar.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /calendars/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${calendar.id}`)
  expect(status).toBe(401)
})

test('DELETE /calendars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
