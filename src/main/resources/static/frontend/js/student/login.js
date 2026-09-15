/* =========================================
IT-MockExams - Student Login
========================================= */

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const loginButton = document.getElementById("loginButton");

const passwordToggle =
document.getElementById("passwordToggle");

const formMessage =
document.getElementById("formMessage");

/* =========================================
Password Show / Hide
========================================= */

passwordToggle.addEventListener("click", function () {


if (password.type === "password") {

    password.type = "text";

    passwordToggle.textContent = "Hide";

} else {

    password.type = "password";

    passwordToggle.textContent = "Show";

}


});

/* =========================================
Error Functions
========================================= */

function showError(input, errorId, message) {


input.classList.add("input-error");

document.getElementById(errorId).textContent = message;


}

function clearError(input, errorId) {

input.classList.remove("input-error");

document.getElementById(errorId).textContent = "";


}

function clearAllErrors() {

clearError(email, "emailError");

clearError(password, "passwordError");

formMessage.className = "form-message";

formMessage.textContent = "";


}

/* =========================================
Email Validation
========================================= */

function isValidEmail(emailValue) {


const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

return emailPattern.test(emailValue);


}

/* =========================================
Login
========================================= */

loginForm.addEventListener("submit", async function (event) {


event.preventDefault();

clearAllErrors();


const emailValue = email.value.trim();

const passwordValue = password.value;


let isValid = true;


/* Email */

if (emailValue === "") {

    showError(
        email,
        "emailError",
        "Please enter your email address."
    );

    isValid = false;

} else if (!isValidEmail(emailValue)) {

    showError(
        email,
        "emailError",
        "Please enter a valid email address."
    );

    isValid = false;

}


/* Password */

if (passwordValue === "") {

    showError(
        password,
        "passwordError",
        "Please enter your password."
    );

    isValid = false;

}


/* Stop if validation fails */

if (!isValid) {

    formMessage.className = "form-message error";

    formMessage.textContent =
        "Please enter your login details.";

    return;
}


/* Disable button */

loginButton.disabled = true;

loginButton.textContent = "Signing In...";


/* =========================================
   Send Login Request
   ========================================= */

try {

    const response = await fetch("/api/auth/login", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email: emailValue,

            password: passwordValue

        })

    });


    const result = await response.text();


    /* =========================================
       Successful Login
       ========================================= */

    if (response.ok) {

        formMessage.className =
            "form-message success";

        formMessage.textContent = result;


        /*
         * Store the logged-in user's email.
         * Other pages will use this email.
         */

        sessionStorage.setItem(
            "userEmail",
            emailValue
        );


        loginForm.reset();


        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 800);


    } else {

        formMessage.className =
            "form-message error";

        formMessage.textContent = result;

    }


} catch (error) {

    console.error("Login Error:", error);

    formMessage.className =
        "form-message error";

    formMessage.textContent =
        "Unable to connect to the server. Please try again.";

}


loginButton.disabled = false;

loginButton.textContent = "Sign In";

});
