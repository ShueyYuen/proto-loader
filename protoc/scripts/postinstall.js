const fs = require('node:fs')
const http = require('node:https')
const path = require('node:path')
const process = require('node:process')
const stream = require('node:stream')
const unzip = require('unzipper')
const { protocPath } = require('../')

const VERSION = process.env.PROTOC_VERSION || '29.2'
const DOWNLOAD_PREFIX
  = process.env.PROTOC_DOWNLOAD_PREFIX
  || 'https://github.com/protocolbuffers/protobuf/releases/download/v'

const PLATFORM_NAME
  = process.platform === 'win32'
    ? 'win'
    : process.platform === 'darwin'
      ? 'osx-'
      : 'linux-'
const ARCH
  = process.platform === 'win32'
    ? process.arch === 'ia32'
      ? '32'
      : '64'
    : process.arch === 'ppc64'
      ? 'ppcle_64'
      : process.arch === 'arm64'
        ? 'aarch_64'
        : process.arch === 's390x'
          ? 's390_64'
          : process.arch === 'ia32'
            ? 'x86_32'
            : 'x86_64'
const UNSUPPORTED_PLATFORMS = ['sunos', 'freebsd', 'openbsd', 'netbsd']
const UNSUPPORTED_ARCHS = ['ppc', 's390', 'arm', 'mips', 'mipsel', 'mips64el']

const protocDirectory = path.join(__dirname, '..')

function clearDirectory(directory) {
  if (!fs.existsSync(directory)) {
    return
  }
  fs.rmSync(directory, {
    recursive: true,
    force: true,
  })
}

function httpGetBuffer(url) {
  const result = new stream.PassThrough()
  http
    .get(url, (response) => {
      if (response.statusCode === 302) {
        return httpGetBuffer(response.headers.location).pipe(result)
      }
      if (response.statusCode !== 200) {
        throw new Error(`HTTP ${response.statusCode}: ${url}`)
      }
      response.on('data', chunk => result.write(chunk))
      response.on('end', () => result.end())
    })
    .on('error', (error) => {
      throw error
    })
  return result
}

const FILTERED_FILES = ['readme.txt']

async function run() {
  if (UNSUPPORTED_PLATFORMS.includes(process.platform)) {
    throw new Error(`Unsupported platform: ${process.platform}`)
  }
  if (UNSUPPORTED_ARCHS.includes(process.arch)) {
    throw new Error(`Unsupported architecture: ${process.arch}`)
  }

  clearDirectory(path.join(protocDirectory, 'bin'))
  clearDirectory(path.join(protocDirectory, 'include'))

  const zipFile = `protoc-${VERSION}-${PLATFORM_NAME}${ARCH}.zip`
  const downloadUrl = `${DOWNLOAD_PREFIX}${VERSION}/${zipFile}`
  console.time('Download')
  console.log(`Downloading ${downloadUrl}...`)
  const response = httpGetBuffer(downloadUrl)
  response.pipe(unzip.Parse()).on('entry', (entry) => {
    if (FILTERED_FILES.includes(entry.path)) {
      entry.autodrain()
      return
    }
    const isFile = entry.type === 'File'
    const isDir = entry.type === 'Directory'
    const filepath = path.join(protocDirectory, entry.path)
    const directory = isDir ? filepath : path.dirname(filepath)

    fs.mkdirSync(directory, { recursive: true })
    if (!isFile) {
      return
    }
    entry.pipe(fs.createWriteStream(filepath)).on('finish', () => {
      if (protocPath !== filepath) {
        return
      }
      fs.chmodSync(filepath, 0x0755)
    })
  })
  await new Promise((resolve, reject) => {
    response.on('end', () => {
      console.timeEnd('Download')
      resolve()
    })
    response.on('error', reject)
  })
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
