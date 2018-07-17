const router = require("express").Router();
const axios = require("axios");

require("dotenv").config()

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

module.exports = router;