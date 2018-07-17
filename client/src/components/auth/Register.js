import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    phonenumber: "",
    errors: {}
  };

  
  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push("/posts")
    }
  }


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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      phonenumber: this.state.phonenumber
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create an account, Connect with Your Community
              </p>
              <small className="form-text text-muted">
                    (* = required)
                  </small>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="* Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="* Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}

                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
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

                <div className="form-group row">
                  <div className="col">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.address
                      })}
                      placeholder="* Address"
                      name="address"
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.address2
                      })}
                      placeholder="Address2"
                      name="address2"
                      value={this.state.address2}
                      onChange={this.handleChange}
                    />
                    {errors.address2 && (
                      <div className="invalid-feedback">{errors.address2}</div>
                    )}
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.city
                      })}
                      placeholder="* City"
                      name="city"
                      value={this.state.city}
                      onChange={this.handleChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.state
                      })}
                      placeholder="* State"
                      name="state"
                      value={this.state.state}
                      onChange={this.handleChange}
                    />
                    {errors.state && (
                      <div className="invalid-feedback">{errors.state}</div>
                    )}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.zipcode
                      })}
                      placeholder="* ZIPCode"
                      name="zipcode"
                      value={this.state.zipcode}
                      onChange={this.handleChange}
                    />
                    {errors.zipcode && (
                      <div className="invalid-feedback">{errors.zipcode}</div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.phonenumber
                    })}
                    placeholder="* Phone Number"
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.handleChange}
                  />
                  {errors.phonenumber && (
                    <div className="invalid-feedback">{errors.phonenumber}</div>
                  )}
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
