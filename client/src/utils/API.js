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
  weatherSearch: function () {
    return axios.get(`/api/weather`);
  }
};
