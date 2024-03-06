document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");

        const usernameValue = usernameInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        const usernamePattern = /^[a-zA-Z0-9_]+$/;

        if (passwordValue === "") {
            displayErrorMessage2("Password is required.");
            return;
        }
        if (usernameValue !== "" && usernameValue.includes("@")) {
            displayErrorMessage1("Username cannot be an email.");
            return;
        }
        if (usernameValue !== "" && !usernamePattern.test(usernameValue)) {
            displayErrorMessage1("Username can only contain letters, numbers, and underscores.");
            return;
        }
        form.submit();
    });

    function displayErrorMessage1(message) {
        const errorMessageElement = document.getElementById("username-error-msg");
        errorMessageElement.textContent = message;
    }
    function displayErrorMessage2(message) {
        const errorMessageElement = document.getElementById("pwd-error-msg");
        errorMessageElement.textContent = message;
    }
});
