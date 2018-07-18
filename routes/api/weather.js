const router = require("express").Router();
const axios = require("axios");

require("dotenv").config()
const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY
router
  .route("/")
  .get(function (req, res) {
    console.log(req.query);
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?zip=08822&APPID={process.env.weatherAPI}`)
      .then(function (weatherData) {
        res.json(weatherData.data)
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });

  })

router.get('/geo/:url', (req, res) => {
  const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  const API_KEY = process.env.GOOGLE_GEOLOCATION_API_KEY
  const nurl = `${BASE_URL}08810?key=${API_KEY}`
  axios.get(nurl).then(result => {
    console.log("######################################################################")
    console.log(result.data.results)
    console.log("######################################################################")
    res.json(result.data.results[0])
  }).catch(err => {
    console.log("===============================================")
    console.log(err)
    console.log("===============================================")
  })
})

router.post('/today', (req, res) => {    
  const url = `${OPEN_WEATHER_BASE_URL}/weather?appid=${OPEN_WEATHER_API_KEY}&lat=${req.body.lat}&lon=${req.body.lng}&units=imperial`
  axios.get(url).then( result => {
    console.log(result);
    res.json(result.data)
  })
})

router.post('/daily', (req,res) => {
  const url = `${OPEN_WEATHER_BASE_URL}/forecast/daily?appid=${OPEN_WEATHER_API_KEY}&lat=${req.body.lat}&lon=${req.body.lng}&units=imperial&cnt=7`
  axios.get(url).then( result => {
    console.log(result);
    res.json(result.data)
  })
})

router.post('/hourly', (req,res)=> {
  const url = `${OPEN_WEATHER_BASE_URL}/forecast?appid=${OPEN_WEATHER_API_KEY}&lat=${req.body.lat}&lon=${req.body.lng}&units=imperial&cnt=12`;
  axios.get(url).then( result => {
    console.log(result);
    res.json(result.data)
  })
})


module.exports = router;