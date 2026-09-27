/* =========================================================
   OUR BOARD RESULTS - RESULTS.JS
   Welcome Public School
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       YEAR RESULT BUTTONS
       ===================================================== */

    const yearButtons = document.querySelectorAll(".year-btn");

    yearButtons.forEach(button => {

        button.addEventListener("click", function () {

            const year = this.dataset.year;

            if (year) {
                window.location.href = `${year}result.html`;
            }

        });

    });


    /* =====================================================
       TOPPER CARD HOVER EFFECT
       ===================================================== */

    const topperCards = document.querySelectorAll(".topper-card");

    topperCards.forEach(card => {

        card.addEventListener("mouseenter", function () {
            this.classList.add("active");
        });

        card.addEventListener("mouseleave", function () {
            this.classList.remove("active");
        });

    });


    /* =====================================================
       NOTIFICATION BUTTON
       ===================================================== */

    const notification = document.querySelector(".notification");

    if (notification) {

        notification.addEventListener("click", function () {

            // You can connect this to your notices page later
            window.location.href = "notices.html";

        });

    }


    /* =====================================================
       STUDENT PROFILE
       ===================================================== */

    const profileBox = document.querySelector(".profile-box");

    if (profileBox) {

        profileBox.addEventListener("click", function () {

            window.location.href = "profile.html";

        });

    }


    /* =====================================================
       SIDEBAR MENU
       ===================================================== */

    const menuItems = document.querySelectorAll(".sidebar ul li");

    menuItems.forEach(item => {

        item.addEventListener("click", function () {

            const link = this.getAttribute("data-link");

            if (link) {
                window.location.href = link;
            }

        });

    });


    /* =====================================================
       IMAGE FALLBACK
       If a topper image is missing
       ===================================================== */

    const topperImages = document.querySelectorAll(".topper-card img");

    topperImages.forEach(img => {

        img.addEventListener("error", function () {

            this.src = "images/student.jpg";

        });

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const currentYearElement = document.querySelector(".current-year");

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }


    /* =====================================================
       PAGE LOADED
       ===================================================== */

    document.body.classList.add("results-page-loaded");

});