const resultData = sessionStorage.getItem("examResult");

console.log("=================================");
console.log("RESULT PAGE");
console.log("Stored examResult:");
console.log(resultData);
console.log("=================================");

if (!resultData) {

    alert("Result data not found.");

    window.location.href = "dashboard.html";

} else {

    const result = JSON.parse(resultData);

    console.log("Parsed Result:");
    console.log(result);

    document.getElementById("examTitle").innerText =
        result.examTitle;

    document.getElementById("score").innerText =
        result.score;

    document.getElementById("totalQuestions").innerText =
        result.totalQuestions;

    document.getElementById("correctAnswers").innerText =
        result.correctAnswers;

    document.getElementById("total").innerText =
        result.totalQuestions;

    let percentage = 0;

    if (result.totalQuestions > 0) {

        percentage =
            (result.correctAnswers /
                result.totalQuestions) * 100;
    }

    document.getElementById("percentage").innerText =
        percentage.toFixed(2) + "%";
}


document.getElementById("dashboardBtn")
    .addEventListener("click", function () {

        window.location.href =
            "dashboard.html";

    });