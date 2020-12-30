import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Meetingslot, { schema } from './model'

const router = new Router()
const { date, adress, bookingId, status, serviceId } = schema.tree

/**
 * @api {post} /meetingslots Create meetingslot
 * @apiName CreateMeetingslot
 * @apiGroup Meetingslot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam date Meetingslot's date.
 * @apiParam adress Meetingslot's adress.
 * @apiParam bookingId Meetingslot's bookingId.
 * @apiParam status Meetingslot's status.
 * @apiParam serviceId Meetingslot's serviceId.
 * @apiSuccess {Object} meetingslot Meetingslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meetingslot not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ date, adress, bookingId, status, serviceId }),
  create)

/**
 * @api {get} /meetingslots Retrieve meetingslots
 * @apiName RetrieveMeetingslots
 * @apiGroup Meetingslot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of meetingslots.
 * @apiSuccess {Object[]} rows List of meetingslots.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /meetingslots/:id Retrieve meetingslot
 * @apiName RetrieveMeetingslot
 * @apiGroup Meetingslot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} meetingslot Meetingslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meetingslot not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /meetingslots/:id Update meetingslot
 * @apiName UpdateMeetingslot
 * @apiGroup Meetingslot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam date Meetingslot's date.
 * @apiParam adress Meetingslot's adress.
 * @apiParam bookingId Meetingslot's bookingId.
 * @apiParam status Meetingslot's status.
 * @apiParam serviceId Meetingslot's serviceId.
 * @apiSuccess {Object} meetingslot Meetingslot's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meetingslot not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ date, adress, bookingId, status, serviceId }),
  update)

/**
 * @api {delete} /meetingslots/:id Delete meetingslot
 * @apiName DeleteMeetingslot
 * @apiGroup Meetingslot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Meetingslot not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
