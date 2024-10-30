const coap = require('../') // or coap
const req = coap.request('coap://34.151.64.135/Kin')

req.on('response', (res) => {
    res.pipe(process.stdout)
})

req.end()
