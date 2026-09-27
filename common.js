/* ==========================================
   COMMON JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const logoutButtons = document.querySelectorAll(".logout-btn");

    logoutButtons.forEach(button => {

        button.addEventListener("click", function () {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {

                alert("Logged out successfully!");

                // Redirect to login page
                window.location.href = "index.html";

            }

        });

    });

});