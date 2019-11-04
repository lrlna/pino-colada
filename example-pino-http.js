var pino = require('pino-http')()
var http = require('http')

var server = http.createServer(function (req, res) {
  pino(req, res)

  if (req.url === '/') {
    res.end('hello world')
  } else if (req.url === '/user' && req.method === 'POST') {
    res.end('new user ✨')
  } else if (req.url === '/content' && req.method === 'PUT') {
    res.end('ou weee here is some updated info')
  } else if (req.url === '/content' && req.method === 'PUT') {
  } else {
    res.statusCode = 404
    res.end()
  }
})
server.listen(8080)
