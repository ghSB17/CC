import React, { Component } from "react";
import {Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


class Landing extends Component {

  
  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/posts")
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Community Connector</h1>
                <p className="lead">
                  {" "}
                  Join Your Community, Create a profile, view community Posts, Comment and connect!
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth:state.auth
})

Landing.propTypes = {
  auth:PropTypes.object.isRequired
}

export default connect(mapStateToProps, {})( Landing)