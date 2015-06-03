var debug = require('debug')('docker-exec-websocket-server:test');
var ws = require('ws');
var Server = require('../lib/server.js');
var slugid = require('slugid');
var path = require('path');

var randpath = '/'+slugid.v4();

var server = new Server({
  container: 'servertest',
  port: 8080,
  path: randpath,
});

var socket = new ws('ws://localhost:8080'+randpath);
socket.once('message',(message) => {
  debug(message);
  socket.send('hi\n');
  socket.on('message',(message) => {
    debug(message);
  })
});
socket.on('open',() => {
  socket.send('cat');
});