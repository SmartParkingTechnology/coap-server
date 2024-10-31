// const req = coap.request('coap://34.151.64.135/Arif')
// import { request } from 'coap' // or coap
const testJSON = require('./test1.json')
const coap = require( '../')
const req = coap.request('coap://localhost/Arif')


console.log(`test json ${testJSON.image.mime}`)

// const payload = {
//     title: 'Test Image',
//     mime:  'image/jpg',
//     data: test1.txt
//}
//console.log('Payload:', payload)
req.write(testJSON.image.data)

req.on('response', (res) => {
    res.pipe(process.stdout)
})

 req.end()



// const coap = require('../');
// const fs = require('fs');

// // Define the CoAP server URL
// const serverUrl = 'coap://localhost';

// // Path to the image file you want to send
// const imagePath = './test1.txt'; // Change this to your image path

// // Create a POST request
// const request = coap.request(serverUrl);

// // Set the request method to POST
// request.method = 'POST';
// request.setOption('Content-Format', 'text/plain');

// // Create a read stream for the image file
// const imageStream = fs.createReadStream(imagePath);

// // Pipe the image stream into the request
// imageStream.pipe(request);

// // Listen for the response
// request.on('response', (res) => {
//     let responseData = '';

//     // Collect the data chunks
//     res.on('data', (chunk) => {
//         responseData += chunk;
//     });

//     // On end, log the response
//     res.on('end', () => {
//         console.log('Response:', responseData);
//         // Close the request
//         request.end();
//     });
// });

// // Handle request errors
// request.on('error', (err) => {
//     console.error('Request error:', err);
// });

// // Send the request
// request.end();