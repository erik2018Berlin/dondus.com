import { success, notFound } from '../../services/response/'
import { MeetingSlot } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  MeetingSlot.create(body)
    .then((meetingSlot) => meetingSlot.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  MeetingSlot.find(query, select, cursor)
    .then((meetingSlots) => meetingSlots.map((meetingSlot) => meetingSlot.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  MeetingSlot.findById(params.id)
    .then(notFound(res))
    .then((meetingSlot) => meetingSlot ? meetingSlot.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  MeetingSlot.findById(params.id)
    .then(notFound(res))
    .then((meetingSlot) => meetingSlot ? Object.assign(meetingSlot, body).save() : null)
    .then((meetingSlot) => meetingSlot ? meetingSlot.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  MeetingSlot.findById(params.id)
    .then(notFound(res))
    .then((meetingSlot) => meetingSlot ? meetingSlot.remove() : null)
    .then(success(res, 204))
    .catch(next)
