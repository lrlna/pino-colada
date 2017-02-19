var merry = require('merry')
var http = require('http')

var notFound = merry.notFound
var error = merry.error
var app = merry()

app.router([
  [ '/', function (req, res, ctx, done) {
    done(null, 'hello world')
  }],
  [ '/error', function (req, res, ctx, done) {
    done(error({ statusCode: 500, message: 'helloooo server error' }))
  }],
  [ '/404', notFound() ]
])

var server = http.createServer(app.start())
server.listen(8080)
