/* =========================================================
   IT-MockExams - Common JavaScript
========================================================= */


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll(".nav-link").forEach(function (link) {

    link.addEventListener("click", function () {

        document.querySelectorAll(".nav-link")
            .forEach(function (navLink) {
                navLink.classList.remove("active");
            });

        this.classList.add("active");

    });

});


/* =========================================================
   STUDENT LOGIN CHECK
========================================================= */

function isStudentLoggedIn() {

    const userEmail =
        sessionStorage.getItem("userEmail");

    return userEmail !== null;
}


/* =========================================================
   ADMIN LOGIN CHECK
========================================================= */

function isAdminLoggedIn() {

    const adminEmail =
        sessionStorage.getItem("adminEmail");

    return adminEmail !== null;
}


/* =========================================================
   STUDENT LOGOUT
========================================================= */

function logoutStudent() {

    sessionStorage.removeItem("userEmail");

    sessionStorage.removeItem("userName");

    window.location.href =
        "/frontend/student/login.html";
}


/* =========================================================
   ADMIN LOGOUT
========================================================= */

function logoutAdmin() {

    sessionStorage.removeItem("adminEmail");

    sessionStorage.removeItem("adminName");

    window.location.href =
        "/frontend/admin/login.html";
}