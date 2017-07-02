var prettyBytes = require('prettier-bytes')
var prettyMs = require('pretty-ms')
var padLeft = require('pad-left')
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

module.exports = function createFormatter () {
  return function formatter (obj) {
    var output = []

    if (!obj.message) obj.message = obj.msg
    if (typeof obj.level === 'number') obj.level = convertLogNumber(obj.level)
    if (!obj.level) obj.level = 'userlvl'
    if (!obj.name) obj.name = ''
    if (!obj.ns) obj.ns = ''

    output.push(formatDate())
    output.push(formatLevel(obj.level))
    output.push(formatNs(obj.ns))
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

  function convertLogNumber (level) {
    if (level === 20) return 'debug'
    if (level === 30) return 'info'
    if (level === 40) return 'warn'
    if (level === 50) return 'error'
    if (level === 60) return 'fatal'
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

  function formatNs (name) {
    return chalk.cyan(name)
  }

  function formatName (name) {
    return chalk.blue(name)
  }

  function formatMessage (obj) {
    var msg = formatMessageName(obj.message)
    if (obj.level === 'error') return chalk.dim.red(msg)
    if (obj.level === 'trace') return chalk.dim.white(msg)
    if (obj.level === 'warn') return chalk.dim.magenta(msg)
    if (obj.level === 'debug') return chalk.dim.yellow(msg)
    if (obj.level === 'fatal') return chalk.bgRed(msg) + nl + obj.stack
    if (obj.level === 'info' || obj.level === 'userlvl') return chalk.green.dim(msg)
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
    var time = prettyMs(elapsed)
    return chalk.gray(time)
  }

  function formatBundleSize (bundle) {
    var bytes = parseInt(bundle, 10)
    var size = prettyBytes(bytes).replace(/ /, '')
    return chalk.gray(size)
  }

  function formatMessageName (message) {
    if (message === 'request') return '<--'
    if (message === 'response') return '-->'
    return message
  }

  function noEmpty (val) {
    return !!val
  }
}
