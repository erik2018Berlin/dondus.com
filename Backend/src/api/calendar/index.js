import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Calendar, { schema } from './model'

const router = new Router()
const { name, notes, meetingSlots } = schema.tree

/**
 * @api {post} /calendars Create calendar
 * @apiName CreateCalendar
 * @apiGroup Calendar
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Calendar's name.
 * @apiParam notes Calendar's notes.
 * @apiParam meetingSlots Calendar's meetingSlots.
 * @apiSuccess {Object} calendar Calendar's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Calendar not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, notes, meetingSlots }),
  create)

/**
 * @api {get} /calendars Retrieve calendars
 * @apiName RetrieveCalendars
 * @apiGroup Calendar
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of calendars.
 * @apiSuccess {Object[]} rows List of calendars.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /calendars/:id Retrieve calendar
 * @apiName RetrieveCalendar
 * @apiGroup Calendar
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} calendar Calendar's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Calendar not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /calendars/:id Update calendar
 * @apiName UpdateCalendar
 * @apiGroup Calendar
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Calendar's name.
 * @apiParam notes Calendar's notes.
 * @apiParam meetingSlots Calendar's meetingSlots.
 * @apiSuccess {Object} calendar Calendar's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Calendar not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, notes, meetingSlots }),
  update)

/**
 * @api {delete} /calendars/:id Delete calendar
 * @apiName DeleteCalendar
 * @apiGroup Calendar
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Calendar not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
