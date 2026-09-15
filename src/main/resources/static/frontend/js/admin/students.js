const adminEmail = sessionStorage.getItem("adminEmail");
const adminName = sessionStorage.getItem("adminName");

if (!adminEmail) {
    window.location.href = "login.html";
}

document.getElementById("adminName").textContent =
    adminName || "Admin";


function loadStudents() {

    fetch("/api/student/admin")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load students");
            }

            return response.json();
        })

        .then(students => {

            console.log("Students received:", students);

            const tableBody =
                document.getElementById("studentsTableBody");

            const studentCount =
                document.getElementById("studentCount");

            studentCount.textContent = students.length;

            tableBody.innerHTML = "";

            if (students.length === 0) {

                tableBody.innerHTML = `
                    <tr>
                        <td colspan="4">
                            No students registered yet.
                        </td>
                    </tr>
                `;

                return;
            }

            students.forEach((student, index) => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${student.fullName}</td>
                    <td>${student.rollNumber}</td>
                    <td>${student.email}</td>
                `;

                tableBody.appendChild(row);
            });

        })

        .catch(error => {

            console.error("Error loading students:", error);

            document.getElementById(
                "studentsTableBody"
            ).innerHTML = `
                <tr>
                    <td colspan="4">
                        Failed to load students.
                    </td>
                </tr>
            `;
        });
}


document.getElementById("logoutButton")
    .addEventListener("click", function(event) {

        event.preventDefault();

        sessionStorage.removeItem("adminEmail");
        sessionStorage.removeItem("adminName");

        window.location.href = "login.html";
    });


loadStudents();