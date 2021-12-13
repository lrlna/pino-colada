#! /usr/bin/env node
var split = require('split2')
var pinoColada = require('./')()
var fs = require('fs')
var input = process.stdin
var output = process.stdout

input.pipe(split(pinoColada)).pipe(output)

// https://github.com/pinojs/pino/pull/358
if (!process.stdin.isTTY && !fs.fstatSync(process.stdin.fd).isFile()) {
  process.once('SIGINT', function noOp () {
    console.log() /* print a line after ^C */
  })
}
