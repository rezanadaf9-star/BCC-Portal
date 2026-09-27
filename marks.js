/* ==========================================
   MARKS PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Marks Page Loaded Successfully!");

    /* ============================
       DOWNLOAD BUTTON
    ============================ */

    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {

        downloadBtn.addEventListener("click", function () {

            alert("Digital Marksheet Download feature will be connected with backend later.");

        });

    }

    /* ============================
       PRINT BUTTON
    ============================ */

    const printBtn = document.querySelector(".print-btn");

    if (printBtn) {

        printBtn.addEventListener("click", function () {

            window.print();

        });

    }

    /* ============================
       SUMMARY CARD HOVER EFFECT
    ============================ */

    const cards = document.querySelectorAll(".summary-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";
            card.style.transition = "0.3s";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

    /* ============================
       TABLE ROW ANIMATION
    ============================ */

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        row.addEventListener("mouseenter", () => {

            row.style.background = "#eef4ff";

        });

        row.addEventListener("mouseleave", () => {

            row.style.background = "";

        });

    });

    /* ============================
       DYNAMIC PAGE TITLE
    ============================ */

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    else {

        greeting = "Good Evening";

    }

    document.title = greeting + " | My Marks";

});

/* ============================================================
   RESPONSIVE HAMBURGER MENU
   ============================================================ */
(function setupResponsiveMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    if (!menuToggle || !sidebar || !overlay) return;

    function openMenu() {
        sidebar.classList.add("menu-open");
        overlay.classList.add("menu-open");
        document.body.classList.add("menu-locked");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    function closeMenu() {
        sidebar.classList.remove("menu-open");
        overlay.classList.remove("menu-open");
        document.body.classList.remove("menu-locked");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    menuToggle.addEventListener("click", function () {
        if (sidebar.classList.contains("menu-open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener("click", closeMenu);

    sidebar.querySelectorAll("li").forEach(function (item) {
        item.addEventListener("click", function () {
            if (window.innerWidth <= 900) closeMenu();
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) closeMenu();
    });
})();
