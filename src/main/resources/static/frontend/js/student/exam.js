let questions = [];
let examDurationMinutes = 0;
let remainingSeconds = 0;
let timerInterval = null;
let examSubmitted = false;

// =========================================
// Get Exam ID
// =========================================

const urlParams = new URLSearchParams(window.location.search);
const examId = urlParams.get("examId");

console.log("Exam ID:", examId);


// =========================================
// Load Exam Details
// =========================================

function loadExamDetails() {

    if (!examId) {
        document.getElementById("loadingMessage").innerText =
            "Exam ID not found.";
        return;
    }

    console.log("Loading exam details...");

    fetch("/api/exams/" + examId)
        .then(response => {

            console.log(
                "Exam API Status:",
                response.status
            );

            if (!response.ok) {
                throw new Error("Failed to load exam details");
            }

            return response.json();
        })
        .then(exam => {

            console.log("Exam details received:");
            console.log(exam);

            // Display exam title
            document.getElementById("examTitle").innerText =
                exam.title;

            // Get Admin configured duration
            examDurationMinutes =
                Number(exam.durationMinutes);

            console.log(
                "Exam Duration:",
                examDurationMinutes,
                "minutes"
            );

            if (
                !examDurationMinutes ||
                examDurationMinutes <= 0
            ) {
                throw new Error(
                    "Invalid exam duration"
                );
            }

            // Convert minutes to seconds
            remainingSeconds =
                examDurationMinutes * 60;

            // Start timer
            startTimer();

            // Load questions
            loadQuestions();
        })
        .catch(error => {

            console.error(
                "Exam loading error:",
                error
            );

            document.getElementById("loadingMessage").innerText =
                "Unable to load exam.";
        });
}


// =========================================
// Start Timer
// =========================================

function startTimer() {

    const timerElement =
        document.getElementById("timer");

    // Display immediately
    updateTimerDisplay();

    // Clear old timer if exists
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {

        if (remainingSeconds <= 0) {

            clearInterval(timerInterval);

            timerElement.innerText = "00:00";

            alert(
                "Time is over! Your exam will be submitted automatically."
            );

            submitExam(true);

            return;
        }

        remainingSeconds--;

        updateTimerDisplay();

    }, 1000);
}


// =========================================
// Update Timer Display
// =========================================

function updateTimerDisplay() {

    const timerElement =
        document.getElementById("timer");

    const minutes =
        Math.floor(remainingSeconds / 60);

    const seconds =
        remainingSeconds % 60;

    timerElement.innerText =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


// =========================================
// Load Questions
// =========================================

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


// =========================================
// Display Questions
// =========================================

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


// =========================================
// Get Student Answers
// =========================================

function getAnswers() {

    const answers = {};

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

    return answers;
}


// =========================================
// Submit Exam
// =========================================

function submitExam(autoSubmit = false) {

    // Prevent duplicate submission
    if (examSubmitted) {
        return;
    }

    const answers = getAnswers();

    console.log("=================================");
    console.log("Student Answers:");
    console.log(answers);
    console.log("=================================");


    // Manual submission
    if (!autoSubmit) {

        if (
            Object.keys(answers).length !==
            questions.length
        ) {

            alert(
                "Please answer all questions before submitting."
            );

            return;
        }
    }


    // Get student email
    const email =
        sessionStorage.getItem("userEmail");

    if (!email) {

        alert(
            "Student login session not found. Please login again."
        );

        window.location.href =
            "login.html";

        return;
    }


    // Mark submitted
    examSubmitted = true;


    // Stop timer
    if (timerInterval) {

        clearInterval(timerInterval);
    }


    const resultRequest = {

        examId: Number(examId),

        email: email,

        answers: answers
    };


    console.log(
        "Sending Result Request:"
    );

    console.log(resultRequest);


    fetch("/api/results/submit", {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"
        },

        body: JSON.stringify(
            resultRequest
        )
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


            sessionStorage.setItem(
                "examResult",
                JSON.stringify(result)
            );


            window.location.href =
                "result.html";
        })
        .catch(error => {

            // Allow retry if submission failed
            examSubmitted = false;

            console.error(
                "Result submission error:",
                error
            );

            alert(
                "Something went wrong while submitting the exam."
            );
        });
}


// =========================================
// Submit Button
// =========================================

document
    .getElementById("submitBtn")
    .addEventListener(
        "click",
        function () {

            const confirmSubmit =
                confirm(
                    "Are you sure you want to submit the exam?"
                );

            if (!confirmSubmit) {
                return;
            }

            submitExam(false);
        }
    );


// =========================================
// Start Application
// =========================================

loadExamDetails();
