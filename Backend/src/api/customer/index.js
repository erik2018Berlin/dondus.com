import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Customer, { schema } from './model'

const router = new Router()
const { street, number, postcode, bankInformation } = schema.tree

/**
 * @api {post} /customers Create customer
 * @apiName CreateCustomer
 * @apiGroup Customer
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam street Customer's street.
 * @apiParam number Customer's number.
 * @apiParam postcode Customer's postcode.
 * @apiParam bankInformation Customer's bankInformation.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ street, number, postcode, bankInformation }),
  create)

/**
 * @api {get} /customers Retrieve customers
 * @apiName RetrieveCustomers
 * @apiGroup Customer
 * @apiUse listParams
 * @apiSuccess {Object[]} customers List of customers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /customers/:id Retrieve customer
 * @apiName RetrieveCustomer
 * @apiGroup Customer
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /customers/:id Update customer
 * @apiName UpdateCustomer
 * @apiGroup Customer
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam street Customer's street.
 * @apiParam number Customer's number.
 * @apiParam postcode Customer's postcode.
 * @apiParam bankInformation Customer's bankInformation.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ street, number, postcode, bankInformation }),
  update)

/**
 * @api {delete} /customers/:id Delete customer
 * @apiName DeleteCustomer
 * @apiGroup Customer
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Customer not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
