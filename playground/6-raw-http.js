const https = require('https');

const url = 'https://api.darksky.net/forecast/443bb96650da8917d66f20c8d4f395ea/40,-75';

const request = https.request(url, (response) => {
  let data = '';

   response.on('data', (chunk) => {
     data = data + chunk.toString();
   });

   response.on('end', () => {
     const body = JSON.parse(data);
     console.log(body);
   });

});

request.on('error', (error) => {
  console.log('An error', error);
});

request.end();
