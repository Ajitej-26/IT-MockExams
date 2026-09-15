/* =========================================
   IT-MockExams - Student Registration
   ========================================= */

const registerForm = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");
const rollNumber = document.getElementById("rollNumber");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const registerButton = document.getElementById("registerButton");

const passwordToggle = document.getElementById("passwordToggle");
const confirmPasswordToggle =
    document.getElementById("confirmPasswordToggle");

const formMessage = document.getElementById("formMessage");


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


confirmPasswordToggle.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";
        confirmPasswordToggle.textContent = "Hide";

    } else {

        confirmPassword.type = "password";
        confirmPasswordToggle.textContent = "Show";
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

    clearError(fullName, "fullNameError");

    clearError(rollNumber, "rollNumberError");

    clearError(email, "emailError");

    clearError(password, "passwordError");

    clearError(confirmPassword, "confirmPasswordError");

    document.getElementById("termsError").textContent = "";

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
   Registration
   ========================================= */

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    clearAllErrors();


    /* Get form values */

    const fullNameValue = fullName.value.trim();

    const rollNumberValue = rollNumber.value.trim();

    const emailValue = email.value.trim();

    const passwordValue = password.value;

    const confirmPasswordValue = confirmPassword.value;


    let isValid = true;


    /* =========================================
       Full Name Validation
       ========================================= */

    if (fullNameValue === "") {

        showError(
            fullName,
            "fullNameError",
            "Please enter your full name."
        );

        isValid = false;

    } else if (fullNameValue.length < 3) {

        showError(
            fullName,
            "fullNameError",
            "Full name must contain at least 3 characters."
        );

        isValid = false;
    }


    /* =========================================
       Roll Number Validation
       ========================================= */

    if (rollNumberValue === "") {

        showError(
            rollNumber,
            "rollNumberError",
            "Please enter your college roll number."
        );

        isValid = false;
    }


    /* =========================================
       Email Validation
       ========================================= */

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


    /* =========================================
       Password Validation
       ========================================= */

    if (passwordValue === "") {

        showError(
            password,
            "passwordError",
            "Please create a password."
        );

        isValid = false;

    } else if (passwordValue.length < 6) {

        showError(
            password,
            "passwordError",
            "Password must contain at least 6 characters."
        );

        isValid = false;
    }


    /* =========================================
       Confirm Password Validation
       ========================================= */

    if (confirmPasswordValue === "") {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Please confirm your password."
        );

        isValid = false;

    } else if (passwordValue !== confirmPasswordValue) {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Passwords do not match."
        );

        isValid = false;
    }


    /* =========================================
       Terms & Conditions
       ========================================= */

    if (!terms.checked) {

        document.getElementById("termsError").textContent =
            "Please accept the Terms & Conditions.";

        isValid = false;
    }


    /* =========================================
       Stop if Validation Failed
       ========================================= */

    if (!isValid) {

        formMessage.className = "form-message error";

        formMessage.textContent =
            "Please correct the highlighted fields.";

        return;
    }


    /* =========================================
       Disable Button
       ========================================= */

    registerButton.disabled = true;

    registerButton.textContent = "Creating Account...";


    /* =========================================
       Send Data to Spring Boot
       ========================================= */

    try {

        const response = await fetch("/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                fullName: fullNameValue,

                rollNumber: rollNumberValue,

                email: emailValue,

                password: passwordValue

            })

        });


        const result = await response.text();


        /* =========================================
           Successful Registration
           ========================================= */

        if (response.ok) {

            formMessage.className = "form-message success";

            formMessage.textContent = result;

            registerForm.reset();

        } else {

            formMessage.className = "form-message error";

            formMessage.textContent = result;
        }


    } catch (error) {

        console.error("Registration Error:", error);

        formMessage.className = "form-message error";

        formMessage.textContent =
            "Unable to connect to the server. Please try again.";

    }


    /* =========================================
       Enable Button Again
       ========================================= */

    registerButton.disabled = false;

    registerButton.textContent = "Create Account";

});