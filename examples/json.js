const coap = require('../') // or coap
    , bl   = require('bl')

coap.createServer(function(req, res) {
  if (req.headers['Accept'] != 'application/json') {
    res.statusCode = '4.06'
    return res.end()
  }

  res.setOption('Content-Format', 'application/json')

  res.end(JSON.stringify({ hello: "world" }))
}).listen(function() {

  coap
    .request({
      pathname: '/Matteo',
      options: {
      }
    })
    .on('response', function(res) {
      console.log('response code', res.code)
      if (res.code !== '2.05')
        return process.exit(1)

      res.pipe(bl(function(err, data) {
        var json = JSON.parse(data)
        console.log(json)
        process.exit(0)
      }))
    })
    .end()
})
