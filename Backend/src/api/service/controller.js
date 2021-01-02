import { success, notFound } from '../../services/response/'
import { Service } from '.'

export const create = ({ provider, bodymen: { body } }, res, next) =>
  Service.create({ ...body, provider })
    .then((service) => service.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Service.find(query, select, cursor)
    .populate('provider')
    .then((services) => services.map((service) => service.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Service.findById(params.id)
    .populate('provider')
    .then(notFound(res))
    .then((service) => service ? service.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Service.findById(params.id)
    .populate('provider')
    .then(notFound(res))
    .then((service) => service ? Object.assign(service, body).save() : null)
    .then((service) => service ? service.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Service.findById(params.id)
    .then(notFound(res))
    .then((service) => service ? service.remove() : null)
    .then(success(res, 204))
    .catch(next)
