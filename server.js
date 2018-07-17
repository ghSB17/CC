const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const nyt = require("./routes/api/nyt");
const weather = require("./routes/api/weather");

const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Database Config
const db = process.env.MONGODB_URI;

//Connect to Mongoose
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`MongoDatabase Connected .......`))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

//Passport JWT authentication strategy
require("./config/passport")(passport);

//Use Routes for user database 
app.use("/api/users", users);
app.use("/api/posts", posts);

//use routes to get news
app.use("/api/nyt", nyt);

//use routes to get weather
app.use("/api/weather", weather);

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("Hello................");
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}......`);
});
