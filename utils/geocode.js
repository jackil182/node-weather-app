const request = require('request');


const getGeoData = (address, cb) => {
  const mapKey =
    'pk.eyJ1IjoiamFja2lsMTgyIiwiYSI6ImNqdTRmaHc1NTB1a2I0NGxsNm13OW42d2EifQ.5TfjMcxRnTAMrv_NZ7Cw2w';
  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapKey}&limit=1`;

  request({ url: mapUrl, json: true }, (err, data) => {
    if (err) {
      cb('unable to connect to geo-service, make sure you provide the location in English');
    } else if (typeof data === 'undefined' || data.body.features.length === 0) {
      cb('address is incorrect');
    } else {
      const [long, lat] = data.body.features[0].center;
      const location = data.body.features[0].place_name;
      cb(null, {long, lat, location});
    }
  });
};


module.exports = getGeoData;