import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
var demoData = require('../demodaten/generateDemoData');

const app = express(apiRoot, api)
const server = http.createServer(app)

const io = require('socket.io')(server.server);
let sockets = new Set();

io.on('connection', socket => {
  sockets.add(socket);
  socket.emit('data', { data: "products" });
  socket.on('clientData', data => console.log(data));
  socket.on('disconnect', () => sockets.delete(socket));
});

if (mongo.uri) {
  mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise



setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)

    //demoData.start();
  })
})

export default app
