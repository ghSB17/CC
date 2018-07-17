const router = require("express").Router();
const axios = require("axios");

require("dotenv").config()

// Matches with "/api/nyt"
router
  .route("/")
  .get(function (req, res) {
    console.log(req.query);

    axios
      .get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.nytAPI}`)
      .then(function (articleData) {
        res.json(articleData.data)
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });

  })

module.exports = router;