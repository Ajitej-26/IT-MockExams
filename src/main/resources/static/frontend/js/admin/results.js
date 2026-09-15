const adminEmail =
    sessionStorage.getItem("adminEmail");

const adminName =
    sessionStorage.getItem("adminName");

// ==============================
// Check Admin Login
// ==============================

if (!adminEmail) {

    window.location.href =
        "login.html";
}


// ==============================
// Display Admin Name
// ==============================

if (adminName) {

    document.getElementById(
        "adminName"
    ).innerText = adminName;
}


// ==============================
// Elements
// ==============================

const resultsTableBody =
    document.getElementById(
        "resultsTableBody"
    );

const resultCount =
    document.getElementById(
        "resultCount"
    );


// ==============================
// Load Student Results
// ==============================

function loadResults() {

    fetch("/api/results/admin")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load results"
                );
            }

            return response.json();
        })

        .then(results => {

            resultsTableBody.innerHTML = "";

            // ==============================
            // Result Count
            // ==============================

            resultCount.innerText =
                results.length +
                (
                    results.length === 1
                        ? " Result"
                        : " Results"
                );


            // ==============================
            // No Results
            // ==============================

            if (results.length === 0) {

                resultsTableBody.innerHTML = `

                    <tr>

                        <td colspan="7">

                            No student results available.

                        </td>

                    </tr>

                `;

                return;
            }


            // ==============================
            // Display Results
            // ==============================

            results.forEach(
                (result, index) => {

                    const row =
                        document.createElement("tr");


                    // Calculate Percentage

                    let percentage = 0;

                    if (
                        result.totalQuestions > 0
                    ) {

                        percentage =
                            (
                                result.correctAnswers /
                                result.totalQuestions
                            ) * 100;
                    }


                    row.innerHTML = `

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${result.email}
                        </td>

                        <td>
                            ${result.exam.title}
                        </td>

                        <td>
                            ${result.totalQuestions}
                        </td>

                        <td>
                            ${result.correctAnswers}
                        </td>

                        <td>
                            ${percentage.toFixed(2)}%
                        </td>

                        <td>
                            ${formatDate(
                                result.attemptedAt
                            )}
                        </td>

                    `;


                    resultsTableBody.appendChild(
                        row
                    );
                }
            );

        })

        .catch(error => {

            console.error(
                "Error loading results:",
                error
            );

            resultsTableBody.innerHTML = `

                <tr>

                    <td colspan="7">

                        Unable to load student results.

                    </td>

                </tr>

            `;

        });
}


// ==============================
// Format Date
// ==============================

function formatDate(dateTime) {

    if (!dateTime) {

        return "-";
    }

    const date =
        new Date(dateTime);

    return date.toLocaleString();
}


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

loadResults();