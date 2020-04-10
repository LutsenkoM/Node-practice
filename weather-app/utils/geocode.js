const request = require('request');

const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF4bHV0cyIsImEiOiJjazgwMGlyMWMwYWtqM2RydWxiZjd6MDRxIn0.5Almfh46DIll4DjmaIh71A';

  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to location service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const latitude = response.body.features[0].center[1];
      const longitude = response.body.features[0].center[0];
      console.log(latitude, longitude);
      callback( undefined,  {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  });
};

module.exports = geoCode;
