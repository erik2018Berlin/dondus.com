import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Provider, { schema } from './model'

const router = new Router()
const { userId, serviceIds, bankAccount, calendarIds } = schema.tree

/**
 * @api {post} /providers Create provider
 * @apiName CreateProvider
 * @apiGroup Provider
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam userId Provider's userId.
 * @apiParam serviceIds Provider's serviceIds.
 * @apiParam bankAccount Provider's bankAccount.
 * @apiParam calendarIds Provider's calendarIds.
 * @apiSuccess {Object} provider Provider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Provider not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ userId, serviceIds, bankAccount, calendarIds }),
  create)

/**
 * @api {get} /providers Retrieve providers
 * @apiName RetrieveProviders
 * @apiGroup Provider
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of providers.
 * @apiSuccess {Object[]} rows List of providers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /providers/:id Retrieve provider
 * @apiName RetrieveProvider
 * @apiGroup Provider
 * @apiSuccess {Object} provider Provider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Provider not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /providers/:id Update provider
 * @apiName UpdateProvider
 * @apiGroup Provider
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam userId Provider's userId.
 * @apiParam serviceIds Provider's serviceIds.
 * @apiParam bankAccount Provider's bankAccount.
 * @apiParam calendarIds Provider's calendarIds.
 * @apiSuccess {Object} provider Provider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Provider not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ userId, serviceIds, bankAccount, calendarIds }),
  update)

/**
 * @api {delete} /providers/:id Delete provider
 * @apiName DeleteProvider
 * @apiGroup Provider
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Provider not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
