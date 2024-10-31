const coap = require('../') // or coap
const server = coap.createServer()

server.on('request', (req, res) => {
    // if (req.headers.Observe !== 0) {
    //     return res.end(new Date().toISOString() + '\n')
    // }

    console.log('Observing the resource');
    console.log('request received from ' + req.url.split('/')[1])
    console.log('Payload:' + req.payload.toString())
    

    // const interval = setInterval(() => {
    //     res.write(new Date().toISOString() + '\n')
    // }, 1000)

    // res.on('finish', () => {
    //     clearInterval(interval)
    // })
})

server.listen(() => {
    console.log('server started')
})
