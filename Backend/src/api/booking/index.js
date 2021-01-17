import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Booking, { schema } from './model'

const router = new Router()
const { customerId, serviceId, abo, meetingId } = schema.tree

/**
 * @api {post} /bookings Create booking
 * @apiName CreateBooking
 * @apiGroup Booking
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam customerId Booking's customerId.
 * @apiParam serviceId Booking's serviceId.
 * @apiParam abo Booking's abo.
 * @apiParam meetingId Booking's meetingId.
 * @apiSuccess {Object} booking Booking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Booking not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ customerId, serviceId, abo, meetingId }),
  create)

/**
 * @api {get} /bookings Retrieve bookings
 * @apiName RetrieveBookings
 * @apiGroup Booking
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} bookings List of bookings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /bookings/:id Retrieve booking
 * @apiName RetrieveBooking
 * @apiGroup Booking
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} booking Booking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Booking not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /bookings/:id Update booking
 * @apiName UpdateBooking
 * @apiGroup Booking
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam customerId Booking's customerId.
 * @apiParam serviceId Booking's serviceId.
 * @apiParam abo Booking's abo.
 * @apiParam meetingId Booking's meetingId.
 * @apiSuccess {Object} booking Booking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Booking not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ customerId, serviceId, abo, meetingId }),
  update)

/**
 * @api {delete} /bookings/:id Delete booking
 * @apiName DeleteBooking
 * @apiGroup Booking
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Booking not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
