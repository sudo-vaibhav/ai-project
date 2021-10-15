const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.teacherName = !isEmpty(data.teacherName) ? data.teacherName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.vision = !isEmpty(data.vision) ? data.vision : "";
  data.course = !isEmpty(data.course) ? data.course : "";

//   data.testId = !isEmpty(data.testId) ? data.testId : "";

  // Name checks
  if (Validator.isEmpty(data.teacherName)) {
    errors.teacherName = "Teacher name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }


  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // vision checks
  if (Validator.isEmpty(data.vision)) {
    errors.vision = "vision field is required";
  }

  // course checks
  if (Validator.isEmpty(data.course)) {
    errors.course = "course field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};