const cp = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const protoc = require('../../protoc')

const resultDir = path.resolve(__dirname, './pb')
const dataDir = path.resolve(__dirname, '../../tests')

beforeAll(() => {
  cp.execSync('cargo build --release', {
    cwd: path.resolve(__dirname, '../'),
  })
  if (fs.existsSync(resultDir)) {
    fs.rmSync(resultDir, { recursive: true })
  }
  fs.mkdirSync(resultDir, { recursive: true })
})

const PLUGIN = path.resolve(__dirname, '../target/release/protoc-gen-ts')
function protocSimple(args, done) {
  protoc(
    [`--plugin=${PLUGIN}`, `--proto_path=${dataDir}`, ...args],
    (err, _stdout, _stderr) => {
      if (err) {
        return done(err)
      }
      done()
    },
  )
}

it('is protoc-gen-ts worked?', (done) => {
  protocSimple(
    [`--ts_out=${resultDir}`, path.resolve(dataDir, "orphan.proto")],
    done
  );
})

it('run with parameter', (done) => {
  protocSimple(
    [
      `--ts_out=service=grpc-web,mode=grpcwebtext:${resultDir}`,
      path.resolve(dataDir, "simple.proto"),
    ],
    done
  );
})

it('multiply files', (done) => {
  protocSimple(
    [
      `--ts_out=${resultDir}`,
      path.resolve(dataDir, "simple.proto"),
      path.resolve(dataDir, "orphan.proto"),
    ],
    done
  );
})
