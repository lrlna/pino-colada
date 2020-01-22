'use strict'

const Hapi = require('@hapi/hapi')

async function run () {
  // Create a server with a host and port
  const server = Hapi.Server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('hapi-pino'))

  // Add the route
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return 'hello world'
    }
  })

  await server.start()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
