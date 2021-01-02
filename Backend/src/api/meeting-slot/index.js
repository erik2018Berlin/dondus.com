import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export MeetingSlot, { schema } from './model'

const router = new Router()
const { serviceId, date, status, bookingId, street, number, postcode } = schema.tree

/**
 * @api {post} /meeting-slots Create meeting slot
 * @apiName CreateMeetingSlot
 * @apiGroup MeetingSlot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam serviceId Meeting slot's serviceId.
 * @apiParam date Meeting slot's date.
 * @apiParam status Meeting slot's status.
 * @apiParam bookingId Meeting slot's bookingId.
 * @apiParam street Meeting slot's street.
 * @apiParam number Meeting slot's number.
 * @apiParam postcode Meeting slot's postcode.
 * @apiSuccess {Object} meetingSlot Meeting slot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meeting slot not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ serviceId, date, status, bookingId, street, number, postcode }),
  create)

/**
 * @api {get} /meeting-slots Retrieve meeting slots
 * @apiName RetrieveMeetingSlots
 * @apiGroup MeetingSlot
 * @apiUse listParams
 * @apiSuccess {Object[]} meetingSlots List of meeting slots.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /meeting-slots/:id Retrieve meeting slot
 * @apiName RetrieveMeetingSlot
 * @apiGroup MeetingSlot
 * @apiSuccess {Object} meetingSlot Meeting slot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meeting slot not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /meeting-slots/:id Update meeting slot
 * @apiName UpdateMeetingSlot
 * @apiGroup MeetingSlot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam serviceId Meeting slot's serviceId.
 * @apiParam date Meeting slot's date.
 * @apiParam status Meeting slot's status.
 * @apiParam bookingId Meeting slot's bookingId.
 * @apiParam street Meeting slot's street.
 * @apiParam number Meeting slot's number.
 * @apiParam postcode Meeting slot's postcode.
 * @apiSuccess {Object} meetingSlot Meeting slot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meeting slot not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ serviceId, date, status, bookingId, street, number, postcode }),
  update)

/**
 * @api {delete} /meeting-slots/:id Delete meeting slot
 * @apiName DeleteMeetingSlot
 * @apiGroup MeetingSlot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Meeting slot not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
