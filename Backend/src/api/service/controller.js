import { success, notFound } from '../../services/response/'
import { Service } from '.'



export const create = ({ provider, bodymen: { body } }, res, next) =>
  Service.create({ ...body, provider })
    .then((service) => service.view(true))
    .then(function(){
      success(res, 201);
      sendServicesToSocketClients(query, select, cursor);
    })
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Service.find(query, select, cursor)
    .populate('provider')
    .then((services) => services.map((service) => service.view()))
    .then(success(res))
   // .then(sendServicesToSocketClients(query, select, cursor))
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
    .then(function(){
      success(res);
      sendServicesToSocketClients(query, select, cursor)
    })
    .then(sendServicesToSocketClients(query, select, cursor))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Service.findById(params.id)
    .then(notFound(res))
    .then((service) => service ? service.remove() : null)
    .then(function(){
      success(res, 204);
      sendServicesToSocketClients(query, select, cursor)
    })
    .catch(next)

//send all services to the socket client if a new service was posted, a service gets updated or deleted
function sendServicesToSocketClients(query, select, cursor){

  for (const socket of sockets) {
    //TODO query und co aus dem socket entnehmen, kann für jeden client anders sein
    Service.find(query, select, cursor)
      .populate('provider')
      .then((services) => services.map((service) => socket.emit('data', service.view())))
    //TODO welches error ahndling in dem fall ?!
    // .catch(next)

  }
}


