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
    if (!obj.name) obj.name = 'unknown'

    output.push(formatDate())
    output.push(formatLevel(obj.level))
    output.push(chalk.blue(obj.name))
    output.push(formatMessage(obj))
    if (obj.method && obj.statusCode) output.push(formatMethod(obj.method, obj.statusCode))
    if (obj.elapsed) output.push(formatLoadTime(obj.elapsed))
    if (obj.contentLength) output.push(formatBundleSize(obj.contentLength))

    return output.join(' ')
  }

  function formatDate () {
    var date = new Date()
    var hours = padLeft(date.getHours().toString(), 2, '0')
    var minutes = padLeft(date.getMinutes().toString(), 2, '0')
    var seconds = padLeft(date.getSeconds().toString(), 2, '0')
    var prettyDate = hours + ':' + minutes + ':' + seconds
    return chalk.dim(prettyDate)
  }

  function formatLevel (level) {
    return emojiLog[level] + ' '
  }

  function formatMethod (method, status) {
    var newStatus = method + ':' + status
    return chalk.dim(newStatus)
  }

  function formatLoadTime (elapsedTime) {
    var elapsed = parseInt(elapsedTime, 10)
    var time = time > 9999 ? prettyMs(elapsed) : elapsed + 'ms'
    return chalk.dim(time)
  }

  function formatBundleSize (bundle) {
    var bytes = parseInt(bundle, 10)
    var size = bytes > 9999 ? prettyBytes(bytes) : bytes + 'B'
    return chalk.dim(size)
  }

  function formatMessage (obj) {
    if (obj.level === 'error') return chalk.dim.red(obj.message)
    if (obj.level === 'trace') return chalk.dim.white(obj.message)
    if (obj.level === 'warn') return chalk.dim.magenta(obj.message)
    if (obj.level === 'debug') return chalk.dim.yellow(obj.message)
    if (obj.level === 'fatal') return chalk.bgRed(obj.message) + nl + obj.stack
    if (obj.level === 'info' || obj.level === 'userlvl') return chalk.dim.green(obj.message)
  }
}
