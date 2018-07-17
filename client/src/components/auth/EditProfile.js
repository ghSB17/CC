import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { updateUser } from "./../../actions/authActions";
import axios from 'axios'

class EditProfile extends Component {
  state = {
    name: "",
    email: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    phonenumber: "",
    errors: {}
  };

  componentWillMount() {

    console.log(this.props.auth.user.exp)
    console.log(  ((this.props.auth.user.exp > (Date.now())/1000) ? "Unexpired":"Expired" ) )
  }
  
  componentDidMount() {
    
    if(this.props.auth.isAuthenticated){
      axios.get('/api/users/current')
      .then(user=> {
        console.log(user)
        this.setState({
          name:user.data.name,
          email:user.data.email,
          address:user.data.address,
          address2:(user.data.address2? user.data.address2:''),
          city:user.data.city,
          state:user.data.state,
          zipcode:user.data.zipcode,
          phonenumber:user.data.phonenumber 
        })
      })
      
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
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      phonenumber: this.state.phonenumber
    };
    this.props.updateUser(newUser, this.props.history);
  };

  handlePwd = event => {
    event.preventDefault();
    var array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
    console.log(array[0])
    //  alert(array[0]);
    axios.post('/api/users/pwdtoken', {token:array[0]} )
    .then(user=> {
      console.log(user)
      this.props.history.push(`/password/${array[0]}`)
  })
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
           
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Update Your Profile</h1>
              <p className="lead text-center">
                Submit Your Changes to Update Your Profile
              </p>
              
              <div className="row">
              <div className="col-lg-8 col-md-7"></div>
              <div className="col-lg-4 col-md-5">
                <button type="button" className="btn btn-info btn-block mt-4" onClick={this.handlePwd}> Change Password </button>
              </div>
              </div>
              <p> </p>
              <form noValidate onSubmit={this.handleSubmit}>
              <small className="form-text text-muted">
              (* = required)
              </small>
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
                    <div className="invalid-feedback" >{errors.phonenumber}</div>
                  )}
                </div>
                <small className="form-text text-danger">
                On Submit You will be required to Login
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

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUser }
)(withRouter(EditProfile));
