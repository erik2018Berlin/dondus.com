import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { MeetingSlot } from '.'

const app = () => express(apiRoot, routes)

let userSession, meetingSlot

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  meetingSlot = await MeetingSlot.create({})
})

test('POST /meeting-slots 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, serviceId: 'test', date: 'test', status: 'test', bookingId: 'test', street: 'test', number: 'test', postcode: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.serviceId).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.bookingId).toEqual('test')
  expect(body.street).toEqual('test')
  expect(body.number).toEqual('test')
  expect(body.postcode).toEqual('test')
})

test('POST /meeting-slots 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /meeting-slots 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /meeting-slots/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${meetingSlot.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(meetingSlot.id)
})

test('GET /meeting-slots/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /meeting-slots/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${meetingSlot.id}`)
    .send({ access_token: userSession, serviceId: 'test', date: 'test', status: 'test', bookingId: 'test', street: 'test', number: 'test', postcode: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(meetingSlot.id)
  expect(body.serviceId).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.bookingId).toEqual('test')
  expect(body.street).toEqual('test')
  expect(body.number).toEqual('test')
  expect(body.postcode).toEqual('test')
})

test('PUT /meeting-slots/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${meetingSlot.id}`)
  expect(status).toBe(401)
})

test('PUT /meeting-slots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, serviceId: 'test', date: 'test', status: 'test', bookingId: 'test', street: 'test', number: 'test', postcode: 'test' })
  expect(status).toBe(404)
})

test('DELETE /meeting-slots/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${meetingSlot.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /meeting-slots/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${meetingSlot.id}`)
  expect(status).toBe(401)
})

test('DELETE /meeting-slots/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
