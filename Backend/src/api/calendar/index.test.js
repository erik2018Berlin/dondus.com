import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Calendar } from '.'

const app = () => express(apiRoot, routes)

let userSession, calendar

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  calendar = await Calendar.create({})
})

test('POST /calendars 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', notes: 'test', meetingSlotIds: 'test', userId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.meetingSlotIds).toEqual('test')
  expect(body.userId).toEqual('test')
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
  expect(Array.isArray(body)).toBe(true)
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
    .send({ access_token: userSession, name: 'test', notes: 'test', meetingSlotIds: 'test', userId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(calendar.id)
  expect(body.name).toEqual('test')
  expect(body.notes).toEqual('test')
  expect(body.meeting-slotIds).toEqual('test')
  expect(body.userId).toEqual('test')
})

test('PUT /calendars/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${calendar.id}`)
  expect(status).toBe(401)
})

test('PUT /calendars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', notes: 'test', meetingSlotIds: 'test', userId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /calendars/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${calendar.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /calendars/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${calendar.id}`)
  expect(status).toBe(401)
})

test('DELETE /calendars/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
