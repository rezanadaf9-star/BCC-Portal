/* ==========================================
   FEES PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Fees Page Loaded Successfully!");

    /* ==========================================
       BUTTONS
    ========================================== */

    const payBtn = document.querySelector(".pay-btn");
    const downloadBtn = document.querySelector(".download-btn");
    const printBtn = document.querySelector(".print-btn");

    /* ==========================================
       PAY FEE
    ========================================== */

    if (payBtn) {

        payBtn.addEventListener("click", function () {

            alert(
                "Online fee payment will be available after the backend is connected."
            );

        });

    }

    /* ==========================================
       DOWNLOAD RECEIPT
    ========================================== */

    if (downloadBtn) {

        downloadBtn.addEventListener("click", function () {

            alert(
                "Receipt download will be available after the backend is connected."
            );

        });

    }

    /* ==========================================
       PRINT RECEIPT
    ========================================== */

    if (printBtn) {

        printBtn.addEventListener("click", function () {

            window.print();

        });

    }

    /* ==========================================
       SUMMARY CARD ANIMATION
    ========================================== */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-8px)";
            this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0)";
            this.style.boxShadow = "";

        });

    });

    /* ==========================================
       TABLE ROW HIGHLIGHT
    ========================================== */

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        row.addEventListener("mouseenter", function () {

            this.style.background = "#eef4ff";

        });

        row.addEventListener("mouseleave", function () {

            this.style.background = "";

        });

    });

    /* ==========================================
       SHOW CURRENT DATE
    ========================================== */

    const today = new Date();

    console.log(
        "Today's Date : " +
        today.toLocaleDateString()
    );

    /* ==========================================
       PAGE TITLE
    ========================================== */

    document.title = "Fee Management | Welcome Public School";

});