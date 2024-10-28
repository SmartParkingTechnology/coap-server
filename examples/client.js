const coap = require('../') // or coap
const req = coap.request('coap://localhost/Kin')

req.on('response', (res) => {
    res.pipe(process.stdout)
})

req.end()
