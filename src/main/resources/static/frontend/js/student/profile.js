// ==============================
// Student Profile
// ==============================


// ==============================
// Get Logged-in User
// ==============================

const email =
    sessionStorage.getItem("userEmail");


// ==============================
// Check Login
// ==============================

if (!email) {

    window.location.href =
        "login.html";

}


// ==============================
// Load Student Profile
// ==============================

function loadProfile() {

    console.log(
        "Loading student profile..."
    );


    fetch(
        "/api/student/profile?email=" +
        encodeURIComponent(email)
    )

        .then(response => {

            console.log(
                "Profile API Status:",
                response.status
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to load profile"
                );

            }


            return response.json();

        })

        .then(student => {

            console.log(
                "Student Profile:"
            );

            console.log(student);


            // Full Name

            document.getElementById(
                "fullName"
            ).innerText =
                student.fullName;


            // Roll Number

            document.getElementById(
                "rollNumber"
            ).innerText =
                student.rollNumber;


            // Email

            document.getElementById(
                "email"
            ).innerText =
                student.email;


            // Hide Loading

            document.getElementById(
                "loadingMessage"
            ).style.display =
                "none";


            // Show Profile

            document.getElementById(
                "profileDetails"
            ).style.display =
                "block";

        })

        .catch(error => {

            console.error(
                "Profile loading error:",
                error
            );


            document.getElementById(
                "loadingMessage"
            ).style.display =
                "none";


            document.getElementById(
                "errorMessage"
            ).innerText =
                "Unable to load your profile.";

        });

}


// ==============================
// Dashboard Button
// ==============================

document.getElementById(
    "dashboardButton"
).addEventListener(
    "click",
    function () {

        window.location.href =
            "dashboard.html";

    }
);


// ==============================
// Start
// ==============================

loadProfile();