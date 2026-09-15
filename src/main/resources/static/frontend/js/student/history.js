// ==============================
// Exam History
// ==============================

const email =
    sessionStorage.getItem("userEmail");
	if (!email) {

	    window.location.href =
	        "login.html";

	}

// ==============================
// Load Exam History
// ==============================

function loadHistory() {


console.log("Loading exam history...");

fetch(
    "/api/results/student?email=" +
    encodeURIComponent(email)
)

    .then(response => {

        console.log(
            "History API Status:",
            response.status
        );

        if (!response.ok) {

            throw new Error(
                "Failed to load exam history"
            );
        }

        return response.json();
    })

    .then(results => {

        console.log("Exam History:");
        console.log(results);

        document.getElementById(
            "loadingMessage"
        ).style.display = "none";

        displayHistory(results);
    })

    .catch(error => {

        console.error(
            "History loading error:",
            error
        );

        document.getElementById(
            "loadingMessage"
        ).innerText =
            "Unable to load exam history.";
    });

}

// ==============================
// Format Date & Time
// ==============================

function formatDateTime(dateTime) {

if (!dateTime) {

    return "N/A";
}


const date =
    new Date(dateTime);


if (isNaN(date.getTime())) {

    return "N/A";
}


return date.toLocaleString(
    "en-IN",
    {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }
);


}

// ==============================
// Display History
// ==============================

function displayHistory(results) {

const historyBody =
    document.getElementById(
        "historyBody"
    );

historyBody.innerHTML = "";


// No history

if (results.length === 0) {

    historyBody.innerHTML = `
        <tr>

            <td colspan="7">
                No exam attempts found.
            </td>

        </tr>
    `;

    return;
}


// Display each result

results.forEach((result, index) => {

    let percentage = 0;


    if (result.totalQuestions > 0) {

        percentage =
            (
                result.correctAnswers /
                result.totalQuestions
            ) * 100;
    }


    const attemptedAt =
        formatDateTime(
            result.attemptedAt
        );


    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>
            ${index + 1}
        </td>

        <td>
            ${result.exam.title}
        </td>

        <td>
            ${result.score} /
            ${result.totalQuestions}
        </td>

        <td>
            ${result.correctAnswers}
        </td>

        <td>
            ${result.totalQuestions}
        </td>

        <td>
            ${percentage.toFixed(2)}%
        </td>

        <td>
            ${attemptedAt}
        </td>

    `;


    historyBody.appendChild(row);

});


}

// ==============================
// Start
// ==============================

loadHistory();
