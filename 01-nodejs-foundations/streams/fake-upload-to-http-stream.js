import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 10) {
        // push method send the data
        this.push(null)
      } else {
        const buf = Buffer.from(i.toString())
        // I can only send Buffers on Streams
        this.push(buf)
      }
    }, 500)
  }
}

// chunks server
// fetch('http://localhost:3334', {
//   method: 'POST',
//   body: new OneToHundredStream(),
//   duplex: 'half' // this tells the fetch api that this stream is readable but does not expect any response to be written back during the request.
// })

// whole data server
fetch('http://localhost:3335', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' // this tells the fetch api that this stream is readable but does not expect any response to be written back during the request.
})
  .then(res => res.text())
  .then(console.log)
