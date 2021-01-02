import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Customer } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Customer.create({ ...body, user })
    .then((customer) => customer.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Customer.find(query, select, cursor)
    .populate('user')
    .then((customers) => customers.map((customer) => customer.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Customer.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((customer) => customer ? customer.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Customer.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((customer) => customer ? Object.assign(customer, body).save() : null)
    .then((customer) => customer ? customer.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Customer.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((customer) => customer ? customer.remove() : null)
    .then(success(res, 204))
    .catch(next)
