const request = require('request');

const getWeather = ({lat, long}, cb) => {
  const key = 'a691ee45b56e50749e3d944e0ba5fcd7';
  const url = `https://api.darksky.net/forecast/${key}/${lat},${long}?units=si&lang=uk`;
  request({ url, json: true }, (err, {body}) => {
    if (err) {
      cb('unable to connect to weather service');
    } else if (body.error) {
      cb('unable to find location');
    } else {
      cb(null, `${body.daily.data[0].summary} The temperature is ${
        body.currently.temperature
      } degress. The chance of rain is ${
        body.currently.precipProbability
      }%.`);
    }
  });
};

module.exports = getWeather;