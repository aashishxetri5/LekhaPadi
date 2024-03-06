const signupForm = document.querySelector("#signupform");

const errorMessageFields = {
  usernameErr: document.getElementById("username-error-msg"),
  passwordErr: document.getElementById("pwd-error-msg"),
  confirmPasswordErr: document.getElementById("confirm-err-msg"),
};

const formFields = {
  username: document.querySelector("#username"),
  password: document.querySelector("#password"),
  retypedPassword: document.querySelector("#cpassword"),
};

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var invalidUsernameRegex = /[!@#$%^&*(),.?":{}|<>-@]/;

  if (invalidUsernameRegex.test(formFields.username.value)) {
    errorMessageFields.usernameErr.innerHTML =
      "Username can only contain underscore symbol";
    return;
  }

  if (formFields.password.value.length < 8) {
    errorMessageFields.passwordErr.innerHTML =
      "Password must be atleast 8 characters";
    return;
  }

  if (formFields.password.value !== formFields.retypedPassword.value) {
    errorMessageFields.confirmPasswordErr.innerHTML = "Passwords Do not match";
    return;
  }

  signupForm.submit();
});
