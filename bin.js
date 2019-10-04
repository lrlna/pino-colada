#! /usr/bin/env node
var split = require('split2')
var pinoColada = require('./')()
var input = process.stdin
var output = process.stdout

input
  .pipe(split(pinoColada))
  .pipe(output)
