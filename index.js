const getGeoData = require('./utils/geocode');
const getWeather = require('./utils/getWeather');
const chalk = require('chalk');

const address = process.argv[2];

if (address) {
  getGeoData(address, (err, data) => {
    if (err) return console.log('err', err);

    getWeather(data, (err, weatherData) => {
      if (err) console.log('err', err);
      console.log('Location', data.location);
      console.log(weatherData);
    });
  });
} else {
  console.log(chalk.bgRed('please, provide a location name'));
}
