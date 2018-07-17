const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
 
  
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required!!";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required!!";
  } else if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = "Password must be between 6 and 15 characters";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
