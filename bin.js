#! /usr/bin/env node
var pinoColada = require('./')()
var input = process.stdin
var output = process.stdout

input
  .pipe(pinoColada)
  .pipe(output)
