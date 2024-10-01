import http from 'node:http'
import { Transform } from 'node:stream'

// We'll usually be able to read data by chunks
// with data structures like texts, videos, images, audios...
// a JSON for example, it's nearly impossible to understand
// only a piece of it

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    console.log(transformed)
    const buf = Buffer.from(transformed.toString())
    // the first param is an error, if there is any
    callback(null, buf)
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
})

server.listen(3334)