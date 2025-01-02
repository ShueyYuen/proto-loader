const fs = require('node:fs')
const path = require('node:path')
const protoc = require('../../protoc')

const PLUGIN = path.resolve(__dirname, '../target/debug/protoc-gen-ts')

it('is protoc installed!', (done) => {
  const resultDir = path.resolve(__dirname, './pb')
  const dataDir = path.resolve(__dirname, '../../examples')
  const dataFile = path.resolve(dataDir, 'simple.proto')

  if (fs.existsSync(resultDir)) {
    fs.rmSync(resultDir, { recursive: true })
  }
  fs.mkdirSync(resultDir, { recursive: true })

  protoc(
    [
      `--plugin=${PLUGIN}`,
      `--proto_path=${dataDir}`,
      `--ts_out=${resultDir}`,
      dataFile,
    ],
    (err, _stdout, _stderr) => {
      if (err) {
        return done(err)
      }
      done()
    },
  )
})
