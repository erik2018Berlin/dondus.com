import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Service, { schema } from './model'

const router = new Router()
const { providerId, postcodes, title, description, category, price, pictures } = schema.tree

/**
 * @api {post} /services Create service
 * @apiName CreateService
 * @apiGroup Service
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam providerId Service's providerId.
 * @apiParam postcodes Service's postcodes.
 * @apiParam title Service's title.
 * @apiParam description Service's description.
 * @apiParam category Service's category.
 * @apiParam price Service's price.
 * @apiParam pictures Service's pictures.
 * @apiSuccess {Object} service Service's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ providerId, postcodes, title, description, category, price, pictures }),
  create)

/**
 * @api {get} /services Retrieve services
 * @apiName RetrieveServices
 * @apiGroup Service
 * @apiUse listParams
 * @apiSuccess {Object[]} services List of services.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /services/:id Retrieve service
 * @apiName RetrieveService
 * @apiGroup Service
 * @apiSuccess {Object} service Service's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /services/:id Update service
 * @apiName UpdateService
 * @apiGroup Service
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam providerId Service's providerId.
 * @apiParam postcodes Service's postcodes.
 * @apiParam title Service's title.
 * @apiParam description Service's description.
 * @apiParam category Service's category.
 * @apiParam price Service's price.
 * @apiParam pictures Service's pictures.
 * @apiSuccess {Object} service Service's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ providerId, postcodes, title, description, category, price, pictures }),
  update)

/**
 * @api {delete} /services/:id Delete service
 * @apiName DeleteService
 * @apiGroup Service
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Service not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
