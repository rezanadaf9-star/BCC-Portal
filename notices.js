/* ==========================================
   NOTICES PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Notices Page Loaded Successfully!");

    /* ==========================================
       DOWNLOAD BUTTON
    ========================================== */

    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {

        downloadBtn.addEventListener("click", function () {

            alert("Notice PDF download will be connected with the backend later.");

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
       NOTICE CARD ANIMATION
    ========================================== */

    const noticeCards = document.querySelectorAll(".notice-card");

    noticeCards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-6px)";
            this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";
            this.style.transition = "0.3s";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0)";
            this.style.boxShadow = "";

        });

    });

    /* ==========================================
       NOTICE ICON ANIMATION
    ========================================== */

    const icons = document.querySelectorAll(".notice-icon");

    icons.forEach(icon => {

        icon.addEventListener("mouseenter", function () {

            this.style.transform = "rotate(10deg) scale(1.1)";
            this.style.transition = "0.3s";

        });

        icon.addEventListener("mouseleave", function () {

            this.style.transform = "rotate(0deg) scale(1)";

        });

    });

    /* ==========================================
       HIGHLIGHT LATEST NOTICE
    ========================================== */

    const latestNotice = document.querySelector(".important");

    if (latestNotice) {

        latestNotice.style.borderLeft = "8px solid #ef4444";

    }

    /* ==========================================
       SHOW CURRENT DATE
    ========================================== */

    const today = new Date();

    console.log("Today's Date:", today.toDateString());

    /* ==========================================
       PAGE TITLE
    ========================================== */

    document.title = "School Notices | Welcome Public School";

});