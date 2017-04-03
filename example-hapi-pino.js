'use strict'

var Hapi = require('hapi')

// Create a server with a host and port
var server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8080
})

// Add the route
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('hello world')
  }
})

server.register(require('hapi-pino'), function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  // Start the server
  server.start(function (err) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
})
