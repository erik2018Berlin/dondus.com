import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Service } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Service.create({ ...body, userId: user })
    .then((service) => service.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Service.count(query)
    .then(count => Service.find(query, select, cursor)
      .populate('userId')
      .then((services) => ({
        count,
        rows: services.map((service) => service.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Service.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((service) => service ? service.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Service.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((service) => service ? Object.assign(service, body).save() : null)
    .then((service) => service ? service.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Service.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((service) => service ? service.remove() : null)
    .then(success(res, 204))
    .catch(next)
