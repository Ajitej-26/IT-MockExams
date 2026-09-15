
// =========================================
// IT-MockExams - Student Dashboard
// =========================================


// =========================================
// Get Logged-in User
// =========================================

const email =
    sessionStorage.getItem("userEmail");


// =========================================
// Check Login Session
// =========================================

if (!email) {

    window.location.href =
        "login.html";
}


// =========================================
// Load Student Profile
// =========================================

function loadStudentProfile() {

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
                    "Failed to load student profile"
                );
            }

            return response.json();
        })

        .then(student => {

            console.log(
                "Student Profile:"
            );

            console.log(student);


            // =========================================
            // Welcome Message
            // =========================================

            document.getElementById(
                "welcomeMessage"
            ).innerText =
                "Welcome back, " +
                student.fullName +
                "!";


            // =========================================
            // Header Student Name
            // =========================================

            document.getElementById(
                "studentName"
            ).innerText =
                student.fullName;

        })

        .catch(error => {

            console.error(
                "Profile loading error:",
                error
            );

        });
}


// =========================================
// Load Available Exams
// =========================================

function loadExams() {

    fetch("/api/exams")

        .then(response => {

            console.log(
                "Exam API Status:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load exams"
                );
            }

            return response.json();
        })

        .then(exams => {

            console.log(
                "Available Exams:"
            );

            console.log(exams);


            // Display Exams

            displayExams(exams);


            // Available Exam Count

            document.getElementById(
                "availableExams"
            ).innerText =
                exams.length;

        })

        .catch(error => {

            console.error(
                "Exam loading error:",
                error
            );


            document.getElementById(
                "examLoading"
            ).style.display =
                "none";


            document.getElementById(
                "examError"
            ).innerText =
                "Unable to load available exams.";

        });
}


// =========================================
// Display Exams
// =========================================

function displayExams(exams) {

    const examGrid =
        document.getElementById(
            "examGrid"
        );


    examGrid.innerHTML = "";


    document.getElementById(
        "examLoading"
    ).style.display =
        "none";


    // =========================================
    // No Exams
    // =========================================

    if (exams.length === 0) {

        examGrid.innerHTML = `
            <p>
                No exams are currently available.
            </p>
        `;

        return;
    }


    // =========================================
    // Create Exam Cards
    // =========================================

    exams.forEach(exam => {

        const examCard =
            document.createElement(
                "div"
            );


        examCard.className =
            "exam-card";


        examCard.innerHTML = `

            <h3>
                ${exam.title}
            </h3>

            <p>
                ${exam.description}
            </p>

            <div class="exam-details">

                <span>
                    Questions:
                    ${exam.totalQuestions}
                </span>

                <span>
                    Duration:
                    ${exam.durationMinutes} mins
                </span>

            </div>

            <button
                type="button"
                class="start-exam-button"
                onclick="startExam(${exam.id})">

                Start Exam

            </button>

        `;


        examGrid.appendChild(
            examCard
        );

    });
}


// =========================================
// Start Exam
// =========================================

function startExam(examId) {

    window.location.href =
        "exam.html?examId=" +
        examId;
}


// =========================================
// Load Student Results
// =========================================

function loadResults() {

    fetch(
        "/api/results/student?email=" +
        encodeURIComponent(email)
    )

        .then(response => {

            console.log(
                "Result API Status:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load results"
                );
            }

            return response.json();
        })

        .then(results => {

            console.log(
                "Student Results:"
            );

            console.log(results);


            // =========================================
            // Exams Completed
            // =========================================

            const completed =
                results.length;


            document.getElementById(
                "examsCompleted"
            ).innerText =
                completed;


            // =========================================
            // Average Score
            // =========================================

            let average = 0;


            if (results.length > 0) {

                let totalPercentage = 0;


                results.forEach(result => {

                    if (
                        result.totalQuestions > 0
                    ) {

                        const percentage =
                            (
                                result.correctAnswers /
                                result.totalQuestions
                            ) * 100;


                        totalPercentage +=
                            percentage;
                    }

                });


                average =
                    totalPercentage /
                    results.length;
            }


            document.getElementById(
                "averageScore"
            ).innerText =
                average.toFixed(2) +
                "%";

        })

        .catch(error => {

            console.error(
                "Result loading error:",
                error
            );

        });
}


// =========================================
// Logout
// =========================================

document.getElementById(
    "logoutButton"
).addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        console.log(
            "Logout clicked"
        );


        // Clear login session

        sessionStorage.clear();


        // Go to Login

        window.location.href =
            "login.html";

    }
);


// =========================================
// Start Dashboard
// =========================================

loadStudentProfile();

loadExams();

loadResults();