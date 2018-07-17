import React, { Component } from "react";
import API from "./../../utils/API";
var utils = require('../../utils/helpers');
var getDate = utils.getDate;
var convertTemp = utils.convertTemp;
var DayItem = require('./DayItem');


class Weather extends Component {
  state = {
    forecast: []
    // q: "",
    // begin_date: "",
    // end_date: ""
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    API.weatherSearch({})
      .then(res => {
        console.log(res.data.results);
        this.setState({
          forecast: res.data.results
        });
      })
      .catch(err => console.log(err));
  }

  weatherSearch = event => {
    event.preventDefault();
    API.weatherSearch({
      q: this.state.q
    })
      .then(res => {
        console.log(res.data);
        this.setState({
          forecast: res.data.response.docs,
          q: ""
        });
      })
      .catch(err => console.log(err));
  };


  // saveArticle = id => {
  //   const savedArticle = this.state.articles.find(
  //     article => article._id === id
  //   );
  //   console.log(savedArticle);
  //   API.articleSave({
  //     title: savedArticle.headline.main,
  //     url: savedArticle.web_url,
  //     date: savedArticle.pub_date || ""
  //   })
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  // };

  render() {
    const props = this.props.location.state;
    return (

      <div>

        {" "}
        <div className="container-fluid">
          <div className="row">
            {/* Form for article search */}
            {/* Article result container */}
            <div className="col-12">
              <h2>
                {this.state.forecast.length
                  ? "Local Weather"
                  : "Didn't find local weather"}
              </h2>
              <div>
                <DayItem day={props} />
                <div className='description-container'>
                  <p>{props.city}</p>
                  <p>{props.weather[0].description}</p>
                  <p>min temp: {convertTemp(props.temp.min)} degrees</p>
                  <p>max temp: {convertTemp(props.temp.max)} degrees</p>
                  <p>humidity: {props.humidity}</p>
                </div>
              </div>
              )
                      }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Weather;
