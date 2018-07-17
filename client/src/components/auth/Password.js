import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { updatePwd } from "./../../actions/authActions";

class Password extends Component {
  state = {
    password: "",
    password2: "",
    errors: {
      password: "",
      password2: ""
    }
  };

  
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    if( this.state.password===""){
      this.setState({
        errors: {password:"Password is required!, cannot be empty"}
      })
      console.log(this.state.errors)
    } else if (this.state.password.length <6 ) {
      this.setState({
        errors:{password:"Password must contain atleast 6 characters and atmost 30"}
      })
      console.log(this.state.errors)
    } else if (this.state.password2==="" ) {
      this.setState({
        errors:{password2:"Password is required!, cannot be empty"}
      })
      console.log(this.state.errors)
    } else if (this.state.password2.length <6 ) {
      this.setState({
        errors:{password2:"Password2 must contain atleast 6 characters and atmost 30"}
      })
      console.log(this.state.errors)
    } else if ( this.state.password !== this.state.password2 ) {
      this.setState({
        errors:{password2:"Passwords must match!"}
      })
      console.log(this.state.errors)
    } else {
      // console.log(this.props.location)
      const str = this.props.location.pathname
      const n = str.lastIndexOf('/')
      const pwdtoken= str.substr(n+1)
      console.log (pwdtoken)
      const newPwd = {
        password: this.state.password,
        pwdtoken:pwdtoken
      };
      // console.log(newPwd)
      this.props.updatePwd(newPwd);
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Change Password</h1>
              <p className="lead text-center">
                Submit Your new Password
              </p>
              <small className="form-text text-muted">
                    (* = required)
              </small>
              <form noValidate onSubmit={this.handleSubmit}>
                
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="* Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="* Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>               
                <small className="form-text text-danger">
                On Submit You will be required to Login Using your New Password
                </small>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Password.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updatePwd: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updatePwd }
)(withRouter(Password));
