const coap = require('../') // or coap
const req = coap.request({
    hostname: 'localhost',
    pathname: 'Arif'
})

req.write('Hello World!')

req.on('response', (res) => {
    res.pipe(process.stdout)
})

req.end()
