import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Calendar } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Calendar.create({ ...body, userId: user })
    .then((calendar) => calendar.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Calendar.count(query)
    .then(count => Calendar.find(query, select, cursor)
      .populate('userId')
      .then((calendars) => ({
        count,
        rows: calendars.map((calendar) => calendar.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Calendar.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((calendar) => calendar ? calendar.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Calendar.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((calendar) => calendar ? Object.assign(calendar, body).save() : null)
    .then((calendar) => calendar ? calendar.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Calendar.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((calendar) => calendar ? calendar.remove() : null)
    .then(success(res, 204))
    .catch(next)
