import axios from "axios";

export default {
  nytSearch: function () {
    return axios.get("/api/nyt");
  },

  articleSave: function (articleInfo) {
    return axios.post("/api/articles", articleInfo);
  },

  // retrieve all saved articles from mongo
  articleRetrieve: function () {
    return axios.get("/api/articles");
  },

  // article delete
  articleDelete: function (id) {
    return axios.delete(`/api/articles/${id}`);
  },

  // retrive weather
  geoSearch: function () {
    return axios.get(`/api/weather/geo/08810`);
  },

  getWeather: function (pos) {
    return axios.post('/api/weather/today', pos)
  },

  getDailyWeather:function(pos) {
    return axios.post('/api/weather/daily', pos)
  },

  getHourlyWeather: function(pos) {
    return axios.post('/api/weather/hourly', pos)
  }
};
