import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Booking } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, booking

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  booking = await Booking.create({})
})

test('POST /bookings 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, customerId: 'test', serviceId: 'test', abo: 'test', meetingId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.customerId).toEqual('test')
  expect(body.serviceId).toEqual('test')
  expect(body.abo).toEqual('test')
  expect(body.meetingId).toEqual('test')
})

test('POST /bookings 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /bookings 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bookings 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /bookings 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /bookings 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /bookings/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${booking.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(booking.id)
})

test('GET /bookings/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${booking.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /bookings/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${booking.id}`)
  expect(status).toBe(401)
})

test('GET /bookings/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /bookings/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${booking.id}`)
    .send({ access_token: adminSession, customerId: 'test', serviceId: 'test', abo: 'test', meetingId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(booking.id)
  expect(body.customerId).toEqual('test')
  expect(body.serviceId).toEqual('test')
  expect(body.abo).toEqual('test')
  expect(body.meetingId).toEqual('test')
})

test('PUT /bookings/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${booking.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /bookings/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${booking.id}`)
  expect(status).toBe(401)
})

test('PUT /bookings/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, customerId: 'test', serviceId: 'test', abo: 'test', meetingId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /bookings/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${booking.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /bookings/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${booking.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /bookings/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${booking.id}`)
  expect(status).toBe(401)
})

test('DELETE /bookings/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
