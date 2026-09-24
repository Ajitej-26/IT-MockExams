// ==============================
// Admin Login
// ==============================

const loginForm =
    document.getElementById("adminLoginForm");

const errorMessage =
    document.getElementById("errorMessage");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value;


        errorMessage.innerText = "";


		fetch(
		    "https://it-mockexams-production.up.railway.app/api/admin/login?email=" +
		    encodeURIComponent(email) +
		    "&password=" +
		    encodeURIComponent(password),
		    {
		        method: "POST"
		    }
		)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Invalid admin email or password"
                );
            }

            return response.json();
        })

        .then(admin => {

            console.log(
                "Admin Login Successful:"
            );

            console.log(admin);


            sessionStorage.setItem(
                "adminEmail",
                admin.email
            );

            sessionStorage.setItem(
                "adminName",
                admin.fullName
            );


            window.location.href =
                "dashboard.html";
        })

        .catch(error => {

            console.error(error);

            errorMessage.innerText =
                "Invalid admin email or password.";

        });

    }
);