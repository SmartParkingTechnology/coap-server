const coap = require('../') // or coap
const server = coap.createServer()

server.on('request', (req, res) => {
    console.log('request received from ' + req.url.split('/')[1])
    res.end('Hello ' + req.url.split('/')[1] + '\n')
    console.log('Payload:' + req.payload.toString())
    
})

server.listen(() => {
    console.log('server started')
})
