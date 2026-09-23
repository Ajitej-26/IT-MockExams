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
// Exam Timer
// ==============================

let timeLeft = 30 * 60;
let timerInterval;

function startTimer() {

    const timerElement =
        document.getElementById("timer");

    timerInterval = setInterval(() => {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;

        timerElement.innerText =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerElement.innerText = "00:00";

            alert(
                "Time is up! Your exam will be submitted automatically."
            );

            submitExam(true);

            return;
        }

        timeLeft--;

    }, 1000);
}


// ==============================
// Load Questions
// ==============================

function loadQuestions() {

    console.log("Loading questions...");

    if (!examId) {

        document.getElementById(
            "loadingMessage"
        ).innerText =
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

function submitExam(autoSubmit = false) {

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


    console.log("Student Answers:");
    console.log(answers);


    // Manual submission requires
    // all questions answered

    if (
        !autoSubmit &&
        Object.keys(answers).length !== questions.length
    ) {

        alert(
            "Please answer all questions before submitting."
        );

        return;
    }


    clearInterval(timerInterval);


    // ==============================
    // Student Email
    // ==============================

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


    // ==============================
    // Result Request
    // ==============================

    const resultRequest = {

        examId: Number(examId),

        email: email,

        answers: answers
    };


    console.log(
        "Sending Result Request:"
    );

    console.log(resultRequest);


    // ==============================
    // Send Result
    // ==============================

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
            "Backend Result:"
        );

        console.log(result);


        sessionStorage.setItem(
            "examResult",
            JSON.stringify(result)
        );


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
}


// ==============================
// Submit Button
// ==============================

document.getElementById("submitBtn")
    .addEventListener("click", function () {

        submitExam(false);

    });


// ==============================
// Start Application
// ==============================

loadQuestions();

startTimer();
