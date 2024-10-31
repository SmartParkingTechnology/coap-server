const coap = require('../') // or coap
const server = coap.createServer()

const {Storage} = require('@google-cloud/storage');


// Import the 'dotenv' package to load environment variables from a .env file
require('dotenv').config();

const projectId = 'sc-neptune-dev';
const keyFilename = 'sc-neptune-dev-coap-server-3b10c9ffa82d.json'
const bucketName = 'sc-neptune-dev-pilot-coap';

console.log(`Project ID: ${projectId}`);
console.log(`Key Filename: ${keyFilename}`);
console.log(`Bucket Name: ${bucketName}`);

// Create a new Storage object with the specified project ID and key file
const storage = new Storage({ projectId, keyFilename });

// Define an asynchronous function to upload a file to Google Cloud Storage
async function uploadFile(bucketName, file, fileOutputName) {
  try {
      // Get a reference to the specified bucket
      const bucket = storage.bucket(bucketName);

      // Upload the specified file to the bucket with the given destination name
      const ret = await bucket.upload(file, {
          destination: fileOutputName
      });

      // Return the result of the upload operation
      return ret;
  } catch (error) {
      // Handle any errors that occur during the upload process
      console.error('Error:', error);
  }
}

server.on('request', async (req, res) => {
    console.log('request received from ' + req.url.split('/')[1])
    console.log('Payload:' + req.payload.toString())
    const result = await uploadFile(bucketName, req.payload.data, 'test_arif_1.jpg')
    console.log('File uploaded successfully:', result);
    

    })

server.listen(() => {
    console.log('server started')
})

// const coap = require('../');
// const fs = require('fs');
// const path = require('path');

// const server = coap.createServer((req, res) => {
//     console.log(`Received request for ${req.url}`);
//     console.log(`Request payload: ${req.method}`);

//     // Handle GET request
//     if (req.method === 'GET') {
//         const responseData = {
//             message: 'Hello from CoAP server!',
//             timestamp: new Date().toISOString(),
//         };

//         res.setOption('Content-Format', 'application/json');
//         res.end(JSON.stringify(responseData));
//     } 
//     // Handle POST request for JPEG images
//     else if (req.method === 'POST') {
//         const filePath = path.join(__dirname, 'uploaded_image.jpg');
        
//         const writeStream = fs.createWriteStream(filePath);
//         req.pipe(writeStream);
        
//         writeStream.on('finish', () => {
//             res.code = '2.04'; // Changed
//             res.end('Image uploaded successfully');
//         });

//         writeStream.on('error', (err) => {
//             console.error('Error writing file:', err);
//             res.code = '5.00'; // Internal Server Error
//             res.end('Internal Server Error');
//         });
//     } else {
//         // Respond with method not allowed for non-GET/POST requests
//         res.code = '4.05'; // Method Not Allowed
//         res.end('Method Not Allowed');
//     }
// });

// // Start the server on port 5683
// server.listen(() => {
//     console.log('CoAP server is running on coap://localhost:5683');
// });
