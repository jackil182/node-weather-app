const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getGeoData = require('../utils/geocode');
const getWeather = require('../utils/getWeather');

const app = express();
const port = process.env.PORT || 3001;

//define paths for Express config: static folder path, views path (for handlebars templates)
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//configure express to use handlebars as templates, and to look for templates in specific folder (the default folder should be called views)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve files
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nazarii'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page YO',
    msg: 'this page will help you'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Subba Raju'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  };

  getGeoData(req.query.address, (error, data={}) => {
    if(error) return res.send({error});

    getWeather(data, (error, weatherData) => {
      if(error) return res.send(error);
      
      res.send({
        address: req.query.address,
        info: weatherData,
        location: data.location,
      });

    })
  })
});

// app.get('', (req, res) => {
//   res.send('Main page');
// });

// app.get('/help', (req, res) => {
//   res.send('Help page');
// });

// app.get('/about', (req, res) => {
//   res.send('<h1>About page</h1>');
// });

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nazarii',
    errMsg: 'Article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nazarii',
    errMsg: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`server is listenning on ${port}`);
});
