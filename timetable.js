/* ==========================================
   TIMETABLE PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Timetable Page Loaded Successfully!");

    /* ==========================================
       DOWNLOAD BUTTON
    ========================================== */

    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {

        downloadBtn.addEventListener("click", function () {

            alert("Timetable download will be connected with the backend later.");

        });

    }

    /* ==========================================
       PRINT BUTTON
    ========================================== */

    const printBtn = document.querySelector(".print-btn");

    if (printBtn) {

        printBtn.addEventListener("click", function () {

            window.print();

        });

    }

    /* ==========================================
       DAY CARD HOVER EFFECT
    ========================================== */

    const dayCards = document.querySelectorAll(".day-card");

    dayCards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-5px)";
            this.style.transition = "0.3s";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

    });

    /* ==========================================
       PERIOD ROW HOVER EFFECT
    ========================================== */

    const periods = document.querySelectorAll(".period");

    periods.forEach(period => {

        period.addEventListener("mouseenter", function () {

            this.style.transform = "translateX(8px)";
            this.style.transition = "0.3s";

        });

        period.addEventListener("mouseleave", function () {

            this.style.transform = "translateX(0px)";

        });

    });

    /* ==========================================
       STUDENT CARD EFFECT
    ========================================== */

    const studentCard = document.querySelector(".student-card");

    if (studentCard) {

        studentCard.addEventListener("mouseenter", function () {

            this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";

        });

        studentCard.addEventListener("mouseleave", function () {

            this.style.boxShadow = "";

        });

    }

    /* ==========================================
       HIGHLIGHT CURRENT DAY
    ========================================== */

    const today = new Date().getDay();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const todayName = days[today];

    document.querySelectorAll(".day-card").forEach(card => {

        const heading = card.querySelector("h2");

        if (heading && heading.textContent.includes(todayName)) {

            card.style.border = "3px solid #1e4fd7";
            card.style.background = "#f8fbff";

        }

    });

    /* ==========================================
       DYNAMIC PAGE TITLE
    ========================================== */

    document.title = "Class Timetable | Welcome Public School";

});