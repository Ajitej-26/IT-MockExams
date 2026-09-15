const adminEmail = sessionStorage.getItem("adminEmail");
const adminName = sessionStorage.getItem("adminName");

// ==============================
// Check admin login
// ==============================

if (!adminEmail) {
    window.location.href = "login.html";
}

// ==============================
// Display admin name
// ==============================

if (adminName) {
    document.getElementById("adminName").innerText = adminName;
}

// ==============================
// Elements
// ==============================

const examSelect =
    document.getElementById("examSelect");

const questionsContainer =
    document.getElementById("questionsContainer");

const questionCount =
    document.getElementById("questionCount");

const questionFormSection =
    document.getElementById("questionFormSection");

const questionForm =
    document.getElementById("questionForm");

const cancelButton =
    document.getElementById("cancelButton");

// ==============================
// Load Exams
// ==============================

function loadExams() {

    fetch("/api/exams/admin")

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load exams");
            }

            return response.json();
        })

        .then(exams => {

            examSelect.innerHTML =
                '<option value="">-- Select an Exam --</option>';

            exams.forEach(exam => {

                const option =
                    document.createElement("option");

                option.value = exam.id;

                option.textContent =
                    exam.title;

                examSelect.appendChild(option);
            });
        })

        .catch(error => {

            console.error(
                "Error loading exams:",
                error
            );

            alert("Unable to load exams.");
        });
}

// ==============================
// Exam Selected
// ==============================

examSelect.addEventListener(
    "change",
    function () {

        const examId = this.value;

        if (!examId) {

            questionFormSection.classList.add(
                "hidden"
            );

            questionsContainer.innerHTML =
                "<p>Select an exam to view questions.</p>";

            questionCount.innerText =
                "0 Questions";

            return;
        }

        questionFormSection.classList.remove(
            "hidden"
        );

        loadQuestions(examId);
    }
);

// ==============================
// Load Questions
// ==============================

function loadQuestions(examId) {

    fetch(
        "/api/questions/exam/" + examId
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load questions"
                );
            }

            return response.json();
        })

        .then(questions => {

            questionsContainer.innerHTML = "";

            questionCount.innerText =
                questions.length +
                (
                    questions.length === 1
                        ? " Question"
                        : " Questions"
                );

            if (questions.length === 0) {

                questionsContainer.innerHTML =
                    "<p>No questions added yet.</p>";

                return;
            }

            questions.forEach(
                (question, index) => {

                    const questionCard =
                        document.createElement("div");

                    questionCard.className =
                        "question-card";

                    let optionsHTML = "";

                    if (
                        question.options &&
                        question.options.length > 0
                    ) {

                        question.options.forEach(
                            option => {

                                optionsHTML += `

                                    <div class="option-item">

                                        <span class="option-label">
                                            ${option.optionLabel}.
                                        </span>

                                        <span>
                                            ${option.optionText}
                                        </span>

                                    </div>

                                `;
                            }
                        );

                    } else {

                        optionsHTML =
                            "<p>No options added.</p>";
                    }

                    questionCard.innerHTML = `

                        <div class="question-number">
                            Question ${index + 1}
                        </div>

                        <div class="question-text">
                            ${question.questionText}
                        </div>

                        <div class="options-area">
                            ${optionsHTML}
                        </div>

                        <div class="correct-answer">

                            Correct Answer:

                            <strong>
                                ${question.correctAnswer}
                            </strong>

                        </div>

                    `;

                    questionsContainer.appendChild(
                        questionCard
                    );
                }
            );
        })

        .catch(error => {

            console.error(
                "Error loading questions:",
                error
            );

            questionsContainer.innerHTML =
                "<p>Unable to load questions.</p>";
        });
}

// ==============================
// Save Question + Options
// ==============================

questionForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const examId =
            examSelect.value;

        if (!examId) {

            alert("Please select an exam.");

            return;
        }

        // ==============================
        // Question Data
        // ==============================

        const questionData = {

            examId: Number(examId),

            questionText:
                document.getElementById(
                    "questionText"
                ).value,

            correctAnswer:
                document.getElementById(
                    "correctAnswer"
                ).value
        };

        console.log(
            "Question Data:",
            questionData
        );

        // ==============================
        // Save Question
        // ==============================

        fetch(
            "/api/questions",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        questionData
                    )
            }
        )

        .then(async response => {

            const responseText =
                await response.text();

            console.log(
                "Question POST Status:",
                response.status
            );

            console.log(
                "Question POST Response:",
                responseText
            );

            if (!response.ok) {

                throw new Error(
                    "Question save failed: " +
                    responseText
                );
            }

            return JSON.parse(
                responseText
            );
        })

        // ==============================
        // Question Saved
        // ==============================

        .then(question => {

            console.log(
                "Saved Question:",
                question
            );

            const questionId =
                question.id;

            // ==============================
            // Prepare Options
            // ==============================

            const options = [

                {
                    label: "A",

                    text:
                        document.getElementById(
                            "optionA"
                        ).value
                },

                {
                    label: "B",

                    text:
                        document.getElementById(
                            "optionB"
                        ).value
                },

                {
                    label: "C",

                    text:
                        document.getElementById(
                            "optionC"
                        ).value
                },

                {
                    label: "D",

                    text:
                        document.getElementById(
                            "optionD"
                        ).value
                }
            ];

            console.log(
                "Options:",
                options
            );

            // ==============================
            // Save Options
            // ==============================

            const optionRequests =
                options.map(option => {

                    const optionData = {

                        question: {
                            id: questionId
                        },

                        optionLabel:
                            option.label,

                        optionText:
                            option.text
                    };

                    console.log(
                        "Saving Option:",
                        optionData
                    );

                    return fetch(
                        "/api/options",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    optionData
                                )
                        }
                    );
                });

            return Promise.all(
                optionRequests
            );
        })

        // ==============================
        // Options Saved
        // ==============================

        .then(responses => {

            responses.forEach(
                response => {

                    if (!response.ok) {

                        throw new Error(
                            "Failed to save an option"
                        );
                    }
                }
            );

            alert(
                "Question and options saved successfully!"
            );

            questionForm.reset();

            loadQuestions(examId);
        })

        // ==============================
        // Error
        // ==============================

        .catch(error => {

            console.error(
                "SAVE ERROR:",
                error
            );

            alert(
                "SAVE ERROR: " +
                error.message
            );
        });
    }
);

// ==============================
// Cancel
// ==============================

cancelButton.addEventListener(
    "click",
    function () {

        questionForm.reset();

        questionFormSection.classList.add(
            "hidden"
        );
    }
);

// ==============================
// Logout
// ==============================

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sessionStorage.removeItem(
                "adminEmail"
            );

            sessionStorage.removeItem(
                "adminName"
            );

            window.location.href =
                "login.html";
        }
    );

// ==============================
// Start Application
// ==============================

loadExams();
