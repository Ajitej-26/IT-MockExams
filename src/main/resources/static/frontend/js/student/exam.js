let questions = [];


// ==============================
// Get Exam ID
// ==============================

const urlParams =
    new URLSearchParams(window.location.search);

const examId =
    urlParams.get("examId");

console.log("Exam ID:", examId);


// ==============================
// Load Questions
// ==============================

function loadQuestions() {

    console.log("Loading questions...");

    if (!examId) {

        document.getElementById("loadingMessage").innerText =
            "Exam ID not found.";

        return;
    }

    fetch("/api/questions/exam/" + examId)

        .then(response => {

            console.log(
                "Question API Status:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load questions"
                );
            }

            return response.json();
        })

        .then(data => {

            console.log("Questions received:");
            console.log(data);

            questions = data;

            document.getElementById(
                "loadingMessage"
            ).style.display = "none";

            displayQuestions(data);
        })

        .catch(error => {

            console.error(
                "Question loading error:",
                error
            );

            document.getElementById(
                "loadingMessage"
            ).innerText =
                "Unable to load questions.";
        });
}


// ==============================
// Display Questions
// ==============================

function displayQuestions(data) {

    const container =
        document.getElementById(
            "questionsContainer"
        );

    container.innerHTML = "";


    data.forEach((question, index) => {

        const questionCard =
            document.createElement("div");

        questionCard.className =
            "question-card";


        let optionsHTML = "";


        question.options.forEach(option => {

            optionsHTML += `
                <label class="option">

                    <input
                        type="radio"
                        name="question-${question.id}"
                        value="${option.optionLabel}"
                    >

                    ${option.optionLabel}.
                    ${option.optionText}

                </label>
            `;
        });


        questionCard.innerHTML = `

            <div class="question-number">
                Question ${index + 1}
            </div>

            <div class="question-text">
                ${question.questionText}
            </div>

            <div class="options">
                ${optionsHTML}
            </div>

        `;


        container.appendChild(questionCard);

    });
}


// ==============================
// Submit Exam
// ==============================

document.getElementById("submitBtn")
    .addEventListener("click", function () {

        const answers = {};


        // Collect selected answers

        questions.forEach(question => {

            const selectedOption =
                document.querySelector(
                    `input[name="question-${question.id}"]:checked`
                );

            if (selectedOption) {

                answers[question.id] =
                    selectedOption.value;

            }

        });


        // Debug

        console.log(
            "================================="
        );

        console.log("Student Answers:");

        console.log(answers);

        console.log(
            "================================="
        );


        // Check all questions answered

        if (
            Object.keys(answers).length
            !== questions.length
        ) {

            alert(
                "Please answer all questions before submitting."
            );

            return;
        }


        // Get logged-in student's email

        const email =
            sessionStorage.getItem("userEmail");


        // Check login session

        if (!email) {

            alert(
                "Student login session not found. Please login again."
            );

            window.location.href =
                "login.html";

            return;
        }


        // Create request

        const resultRequest = {

            examId: Number(examId),

            email: email,

            answers: answers

        };


        console.log(
            "Sending Result Request:"
        );

        console.log(resultRequest);


        // Send result to backend

        fetch("/api/results/submit", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(resultRequest)

        })

        .then(response => {

            console.log(
                "Result API Status:",
                response.status
            );

            if (!response.ok) {

                throw new Error(
                    "Result submission failed"
                );

            }

            return response.json();

        })

        .then(result => {

            console.log(
                "================================="
            );

            console.log(
                "Backend Result:"
            );

            console.log(result);

            console.log(
                "================================="
            );


            // Store result

            sessionStorage.setItem(
                "examResult",
                JSON.stringify(result)
            );


            // Open result page

            window.location.href =
                "result.html";

        })

        .catch(error => {

            console.error(
                "Result submission error:",
                error
            );

            alert(
                "Something went wrong while submitting the exam."
            );

        });

    });


// ==============================
// Start Application
// ==============================

loadQuestions();