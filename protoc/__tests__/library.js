const protoc = require('../index.js')

protoc.library(['protoc/include/google/protobuf/timestamp.proto'], (err) => {
  if (err) {
    console.error(err)
  }
})
