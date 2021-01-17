import { success, notFound } from '../../services/response/'
import { Booking } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Booking.create(body)
    .then((booking) => booking.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Booking.find(query, select, cursor)
    .then((bookings) => bookings.map((booking) => booking.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Booking.findById(params.id)
    .then(notFound(res))
    .then((booking) => booking ? booking.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Booking.findById(params.id)
    .then(notFound(res))
    .then((booking) => booking ? Object.assign(booking, body).save() : null)
    .then((booking) => booking ? booking.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Booking.findById(params.id)
    .then(notFound(res))
    .then((booking) => booking ? booking.remove() : null)
    .then(success(res, 204))
    .catch(next)
