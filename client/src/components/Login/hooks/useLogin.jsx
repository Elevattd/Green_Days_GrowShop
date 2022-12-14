const validateEmail = (input) => {
  let errorsEmail = {};
  if (input.email.includes(" ")) {
    errorsEmail.email = "Enter a valid Email";
  }
  if (
    !input.email.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i //eslint-disable-line
    )
  ) {
    errorsEmail.email = "Enter a valid Email";
  }
  return errorsEmail;
};

const validatePassword = (input, field = "password", errorsPassword = {}) => {
  if (input[field].includes(" ")) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else if (!input[field].match(/^([a-zA-Z0-9]){6,15}$/)) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else if (input[field].length < 6) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else if (input[field].length > 15) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else delete errorsPassword[field];
  return errorsPassword;
};

const validateName = (input, field = "name", errorsName = {}) => {
  if (input[field].includes(" ")) {
    errorsName[field] =
      "The name must contain at least 6 to 20 characters and only admits letters";
  } else if (!input[field].match(/^([a-zA-Z]){6,20}$/)) {
    errorsName[field] =
      "The name must contain at least 6 to 20 characters and only admits letters";
  } else delete errorsName[field];
  return errorsName;
};

//Todo: Esta funcion es para el registro, modificarla a gusto.
const validateRegisterForm = (input) => {
  let errors = {};

  if (!input.concept.match(/^([a-zA-Z0-9]){6,30}$/)) {
    errors.concept =
      "The concept must contain at least 6 to 30 characters and only admits letters or numbers";
  } else if (input.concept.length < 6) {
    errors.concept =
      "The concept must contain at least 6 to 30 characters and only admits letters or numbers";
  } else if (input.concept.length > 30) {
    errors.concept =
      "The concept must contain at least 6 to 30 characters and only admits letters or numbers";
  }
  if (input.type === "") {
    errors.type = "Select type of transaction.";
  }
  if (input.value === null) {
    errors.value = "Please entry a value.";
  }
  if (input.date === "") {
    errors.date = "Select date.";
  }

  return errors;
};

export { validateEmail, validatePassword, validateName, validateRegisterForm };
