var split = require('split2')
var jsonParse = require('fast-json-parse')
var createFormatter = require('./formatter')
var nl = '\n'

module.exports = PinoColada

function PinoColada () {
  var formatter = createFormatter()

  return split(parse)

  function parse (line) {
    var obj = jsonParse(line)
    if (!obj.value || obj.err) return line + nl
    return formatter(obj.value) + nl
  }
}
