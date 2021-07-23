const usernameEl = document.querySelector("#username");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const confirmPasswordEl = document.querySelector("#confirm-password");

const signupForm = document.querySelector("#signup");
const loginForm = document.querySelector("#login");
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
  /*
    Password RegEx	Meaning
    ^	The password starts
    (?=.*[a-z])	The password must contain at least one lowercase character
    (?=.*[A-Z])	The password must contain at least one uppercase character
    (?=.*[0-9])	The password must contain at least one number
    (?=.*[!@#$%^&*])	The password must contain at least one special character.
    (?=.{8,})	The password must be eight characters or longer
    */
  return re.test(password);
};

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkUsername = () => {
 
  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameEl.value.trim();

  if (!isRequired(username)) {
    showError(usernameEl, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameEl,
      `Username must be between ${min} and ${max} characters.`
    );
  } else {
    showSuccess(usernameEl);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 6 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number."
    );
    // showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  // check confirm password
  const confirmPassword = confirmPasswordEl.value.trim();
  const password = passwordEl.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, "Please enter the password again");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, "Confirm password does not match");
  } else {
    showSuccess(confirmPasswordEl);
    valid = true;
  }

  return valid;
};

// Debounce the input
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// instance input feedback
if(loginForm){
    loginForm.addEventListener(
        "input",
        debounce(function (e) {
          switch (e.target.id) {
            case "email":
              checkEmail();
              break;
            case "password":
              checkPassword();
              break;
          }
        })
      );

      loginForm.addEventListener("submit", function (e) {
        // prevent the form from submitting
        e.preventDefault();
        // validate fields
        let isEmailValid = checkEmail(),
          isPasswordValid = checkPassword();
      
        let isFormValid = isEmailValid && isPasswordValid;
      
        // submit to the server if the form is valid
        if (isFormValid) {
            e.currentTarget.submit();
        }
      });
      
}

if(signupForm){
    signupForm.addEventListener(
        "input",
        debounce(function (e) {
          switch (e.target.id) {
            case "username":
              checkUsername();
              break;
            case "email":
              checkEmail();
              break;
            case "password":
              checkPassword();
              break;
            case "confirm-password":
              checkConfirmPassword();
              break;
          }
        })
      );
      
      signupForm.addEventListener("submit", function (e) {
        // prevent the form from submitting
        e.preventDefault();
        // validate fields
        let isUsernameValid = checkUsername(),
          isEmailValid = checkEmail(),
          isPasswordValid = checkPassword(),
          isConfirmPasswordValid = checkConfirmPassword();
      
        let isFormValid =
          isUsernameValid &&
          isEmailValid &&
          isPasswordValid &&
          isConfirmPasswordValid;
      
        // submit to the server if the form is valid
        if (isFormValid) {
            e.currentTarget.submit();
        }
      });
}





/*---------------------- reference from ---------------------------------
https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/

----------------------------------------------------------------*/
