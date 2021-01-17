import { success, notFound } from '../../services/response/'
import { Calendar } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Calendar.create(body)
    .then((calendar) => calendar.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Calendar.find(query, select, cursor)
    .then((calendars) => calendars.map((calendar) => calendar.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Calendar.findById(params.id)
    .then(notFound(res))
    .then((calendar) => calendar ? calendar.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Calendar.findById(params.id)
    .then(notFound(res))
    .then((calendar) => calendar ? Object.assign(calendar, body).save() : null)
    .then((calendar) => calendar ? calendar.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Calendar.findById(params.id)
    .then(notFound(res))
    .then((calendar) => calendar ? calendar.remove() : null)
    .then(success(res, 204))
    .catch(next)
