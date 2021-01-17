import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
var demoData = require('../demodaten/generateDemoData');

const app = express(apiRoot, api)
const server = http.createServer(app)

var io = require('socket.io')(server);
global.sockets = new Set();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', socket => {
  sockets.add(socket);
  console.log("new socket client connected");

  socket.on('clientData', data => console.log(data));

  socket.on('disconnect', () => {
    sockets.delete(socket);
    console.log("socket client disconnected");
  });
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
