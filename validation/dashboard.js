const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDashboardInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
//   data.password2 = !isEmpty(data.password2) ? data.password2 : "";
//   data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name cannot be empty!!";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty!!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

//   if (Validator.isEmpty(data.password)) {
//     errors.password = "Password cannot be empty!!";
//   } else if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
//     errors.password = "Password must be between 6 and 15 characters";
//   }

//   if (Validator.isEmpty(data.password2)) {
//     errors.password2 = "Password2 cannot be empty!!";
//   } else if (!Validator.isLength(data.password2, { min: 6, max: 15 })) {
//     errors.password2 = "Password2 must be between 6 and 15 characters";
//   } else if (!Validator.equals(data.password2, data.password)) {
//     errors.password2 = "Password2 must match!";
//   }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address cannot be empty!!";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City cannot be left empty!!";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State cannot be left empty!!";
  }

  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode cannot be left empty!!";
  }

  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = "Phone Number cannot be left empty!!";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
