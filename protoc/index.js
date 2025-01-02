const cp = require('node:child_process')
const path = require('node:path')
const process = require('node:process')

const BIN_DIR = path.resolve(__dirname, 'bin')
const EXT = process.platform === 'win32' ? '.exe' : ''

module.exports = function (args, options, callback) {
  cp.execFile(module.exports.protocPath, args, options, callback)
}

module.exports.protocPath = path.resolve(BIN_DIR, `protoc${EXT}`)
