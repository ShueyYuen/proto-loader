#!/usr/bin/env node

const child_process = require('node:child_process')
const process = require('node:process')
const PLUGIN = require('./')

child_process
  .spawn(PLUGIN, process.argv.slice(2), { stdio: 'inherit' })
  .on('exit', code => process.exit(code))
