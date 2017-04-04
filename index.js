var prettyBytes = require('prettier-bytes')
var jsonParse = require('fast-json-parse')
var prettyMs = require('pretty-ms')
var padLeft = require('pad-left')
var split = require('split2')
var chalk = require('chalk')
var nl = '\n'

var emojiLog = {
  warn: '⚠️',
  info: '✨',
  error: '🚨',
  debug: '🐛',
  fatal: '💀',
  trace: '🔍'
}

module.exports = PinoColada

function PinoColada () {
  return split(parse)

  function parse (line) {
    var obj = jsonParse(line)
    if (!obj.value || obj.err) return line + nl
    obj = obj.value

    if (!obj.level) return line + nl
    if (typeof obj.level === 'number') convertLogNumber(obj)

    return output(obj) + nl
  }

  function convertLogNumber (obj) {
    if (!obj.message) obj.message = obj.msg
    if (obj.level === 20) obj.level = 'debug'
    if (obj.level === 30) obj.level = 'info'
    if (obj.level === 40) obj.level = 'warn'
    if (obj.level === 50) obj.level = 'error'
    if (obj.level === 60) obj.level = 'fatal'
  }

  function output (obj) {
    var output = []

    if (!obj.level) obj.level = 'userlvl'
    if (!obj.name) obj.name = ''

    output.push(formatDate())
    output.push(formatLevel(obj.level))
    output.push(formatName(obj.name))
    output.push(formatMessage(obj))

    var req = obj.req
    var res = obj.res
    var statusCode = (res) ? res.statusCode : obj.statusCode
    var responseTime = obj.responseTime || obj.elapsed
    var method = (req) ? req.method : obj.method
    var contentLength = obj.contentLength
    var url = (req) ? req.url : obj.url

    if (method != null) {
      output.push(formatMethod(method))
      output.push(formatStatusCode(statusCode))
    }
    if (url != null) output.push(formatUrl(url))
    if (contentLength != null) output.push(formatBundleSize(contentLength))
    if (responseTime != null) output.push(formatLoadTime(responseTime))

    return output.filter(noEmpty).join(' ')
  }

  function formatDate () {
    var date = new Date()
    var hours = padLeft(date.getHours().toString(), 2, '0')
    var minutes = padLeft(date.getMinutes().toString(), 2, '0')
    var seconds = padLeft(date.getSeconds().toString(), 2, '0')
    var prettyDate = hours + ':' + minutes + ':' + seconds
    return chalk.gray(prettyDate)
  }

  function formatLevel (level) {
    return emojiLog[level] + ' '
  }

  function formatName (name) {
    return chalk.blue(name)
  }

  function formatMessage (obj) {
    if (obj.level === 'error') return chalk.dim.red(obj.message)
    if (obj.level === 'trace') return chalk.dim.white(obj.message)
    if (obj.level === 'warn') return chalk.dim.magenta(obj.message)
    if (obj.level === 'debug') return chalk.dim.yellow(obj.message)
    if (obj.level === 'fatal') return chalk.bgRed(obj.message) + nl + obj.stack
    if (obj.level === 'info' || obj.level === 'userlvl') return formatMessageName(obj.message)
  }

  function formatUrl (url) {
    return chalk.white(url)
  }

  function formatMethod (method) {
    return chalk.white(method)
  }

  function formatStatusCode (statusCode) {
    statusCode = statusCode || 'xxx'
    return chalk.white(statusCode)
  }

  function formatLoadTime (elapsedTime) {
    var elapsed = parseInt(elapsedTime, 10)
    var time = time > 9999 ? prettyMs(elapsed) : elapsed + 'ms'
    return chalk.gray(time)
  }

  function formatBundleSize (bundle) {
    var bytes = parseInt(bundle, 10)
    var size = prettyBytes(bytes).replace(/ /, '')
    return chalk.gray(size)
  }

  function formatMessageName (message) {
    if (message === 'request') return chalk.dim.green('<--')
    if (message === 'response') return chalk.dim.green('-->')
    return chalk.dim.green(message)
  }

  function noEmpty (val) {
    return !!val
  }
}
