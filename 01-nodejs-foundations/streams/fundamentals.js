import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++
    
    setTimeout(() => {
      if (i > 100) {
        // push send the data
        // there aren't any more data to read
        this.push(null)
      } else {
        // Streams only allow to send Buffers
        const buf = Buffer.from(String(i))
        
        this.push(buf)
      }
    }, 500)
  }
}

// Writable Streams only write data, they will never return something
// or even transform data, there is a special type of stream for that called Transform
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

// The Transform Stream we need to READ the data from somewhere and WRITE it somewhere else
// It's like a middle stream
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    const buf = Buffer.from(String(transformed))

    // the first param is the error, if there is any
    callback(null, buf)
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())

// Another type of Stream is Duplex, which is a combination of Readable and Writable
// One example of Duplex Stream files of our system that we can read and write on it 
