const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required!!";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required!!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required!!";
  } else if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = "Password must be between 6 and 15 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required!!";
  } else if (!Validator.isLength(data.password2, { min: 6, max: 15 })) {
    errors.password2 = "Confirm Password must be between 6 and 15 characters";
  } else if (!Validator.equals(data.password2, data.password)) {
    errors.password2 = "Confirm Password must match!";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required!!";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required!!";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required!!";
  }

  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode field is required!!";
  }

  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = "Phone Number field is required!!";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
