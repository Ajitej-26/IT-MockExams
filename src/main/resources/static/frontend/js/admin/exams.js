const adminEmail = sessionStorage.getItem("adminEmail");
const adminName = sessionStorage.getItem("adminName");


// Check admin login

if (!adminEmail) {
    window.location.href = "login.html";
}


// Display admin name

if (adminName) {
    document.getElementById("adminName").innerText = adminName;
}


// Elements

const examTableBody = document.getElementById("examTableBody");
const examCount = document.getElementById("examCount");

const examFormSection = document.getElementById("examFormSection");
const examForm = document.getElementById("examForm");

const addExamButton = document.getElementById("addExamButton");
const cancelButton = document.getElementById("cancelButton");

const formTitle = document.getElementById("formTitle");


// Load exams

function loadExams() {

    fetch("/api/exams/admin")

        .then(response => response.json())

        .then(exams => {

            examTableBody.innerHTML = "";

            examCount.innerText =
                exams.length + (exams.length === 1 ? " Exam" : " Exams");


            exams.forEach(exam => {

                const row = document.createElement("tr");

                row.innerHTML = `

                    <td>${exam.id}</td>

                    <td>
                        <strong>${exam.title}</strong>

                        <br>

                        <small>
                            ${exam.description}
                        </small>
                    </td>

                    <td>
                        ${exam.totalQuestions}
                    </td>

                    <td>
                        ${exam.durationMinutes} min
                    </td>

                    <td>

                        <span class="${exam.active ? "status-active" : "status-inactive"}">

                            ${exam.active ? "Active" : "Inactive"}

                        </span>

                    </td>

                    <td>

                        <button
                            class="edit-button"
                            onclick="editExam(${exam.id})"
                        >
                            Edit
                        </button>

                        <button
                            class="delete-button"
                            onclick="deleteExam(${exam.id})"
                        >
                            Delete
                        </button>

                    </td>

                `;

                examTableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error("Error loading exams:", error);

            alert("Unable to load exams.");

        });

}


// Show Add Exam form

addExamButton.addEventListener("click", function() {

    examForm.reset();

    document.getElementById("examId").value = "";

    document.getElementById("active").checked = true;

    formTitle.innerText = "Add New Exam";

    examFormSection.classList.remove("hidden");

});


// Cancel

cancelButton.addEventListener("click", function() {

    examForm.reset();

    document.getElementById("examId").value = "";

    examFormSection.classList.add("hidden");

});


// Save Exam

examForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const examId =
        document.getElementById("examId").value;


    const examData = {

        title:
            document.getElementById("title").value,

        description:
            document.getElementById("description").value,

        totalQuestions:
            Number(document.getElementById("totalQuestions").value),

        durationMinutes:
            Number(document.getElementById("durationMinutes").value),

        active:
            document.getElementById("active").checked

    };


    let url = "/api/exams";
    let method = "POST";


    // Edit existing exam

    if (examId) {

        url = "/api/exams/" + examId;
        method = "PUT";

    }


    fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(examData)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to save exam");
        }

        return response.json();

    })

    .then(data => {

        alert(
            examId
                ? "Exam updated successfully!"
                : "Exam added successfully!"
        );

        examForm.reset();

        examFormSection.classList.add("hidden");

        loadExams();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to save exam.");

    });

});


// Edit Exam

function editExam(id) {

    fetch("/api/exams/" + id)

        .then(response => response.json())

        .then(exam => {

            document.getElementById("examId").value =
                exam.id;

            document.getElementById("title").value =
                exam.title;

            document.getElementById("description").value =
                exam.description;

            document.getElementById("totalQuestions").value =
                exam.totalQuestions;

            document.getElementById("durationMinutes").value =
                exam.durationMinutes;

            document.getElementById("active").checked =
                exam.active;


            formTitle.innerText = "Edit Exam";

            examFormSection.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load exam.");

        });

}


// Delete Exam

function deleteExam(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this exam?");


    if (!confirmDelete) {
        return;
    }


    fetch("/api/exams/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        return response.text();

    })

    .then(message => {

        alert("Exam deleted successfully!");

        loadExams();

    })

    .catch(error => {

        console.error(error);

        alert("Unable to delete exam.");

    });

}


// Logout

document
    .getElementById("logoutButton")
    .addEventListener("click", function(event) {

        event.preventDefault();

        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("adminName");

        window.location.href = "login.html";

    });


// Initial load

loadExams();