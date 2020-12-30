import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Meetingslot } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Meetingslot.create({ ...body, userId: user })
    .then((meetingslot) => meetingslot.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Meetingslot.count(query)
    .then(count => Meetingslot.find(query, select, cursor)
      .populate('userId')
      .then((meetingslots) => ({
        count,
        rows: meetingslots.map((meetingslot) => meetingslot.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Meetingslot.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((meetingslot) => meetingslot ? meetingslot.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Meetingslot.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((meetingslot) => meetingslot ? Object.assign(meetingslot, body).save() : null)
    .then((meetingslot) => meetingslot ? meetingslot.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Meetingslot.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((meetingslot) => meetingslot ? meetingslot.remove() : null)
    .then(success(res, 204))
    .catch(next)
