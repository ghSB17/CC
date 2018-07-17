import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from './components/common/PrivateRoute'

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Posts from "./components/posts/Posts";
import Post from './components/post/Post'
import News from './components/news/News'
import Board from './components/board/bindex'
import EditProfile from './components/auth/EditProfile'
import Password from './components/auth/Password'

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

//Check for token
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  //set AuthHeader to token
  setAuthToken(token);
  //Decode token and get user info and exp info
  const decoded = jwt_decode(token);
  //Set the current user and isAuthenticated --> redux state 
  store.dispatch(setCurrentUser(decoded));
  //Check for expired Token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = "/"
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />

              <Route exact path="/register" component={Register} />

              <Switch>
                <PrivateRoute exact path="/posts" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/post/:id' component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/board" component={Board} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/news" component={News} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile" component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/password/:token" component={Password} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
