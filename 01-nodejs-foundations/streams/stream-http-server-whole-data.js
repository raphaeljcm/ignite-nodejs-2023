import http from 'node:http'

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  const chunks = []
  
  // If I need the whole data before doing something
  // I can await a chunk to be read and store it in an array
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  // Then, I'll concat and the chunks
  const fullStreamContent = Buffer.concat(chunks).toString()

  res.end(fullStreamContent)
})

server.listen(3335)