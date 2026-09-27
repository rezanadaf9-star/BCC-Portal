/* ==========================================
   SETTINGS PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Settings Page Loaded Successfully!");

    /* ==========================================
       BUTTONS
    ========================================== */

    const saveBtn = document.querySelector(".save-btn");
    const resetBtn = document.querySelector(".reset-btn");

    /* ==========================================
       SAVE BUTTON
    ========================================== */

    if (saveBtn) {

        saveBtn.addEventListener("click", function () {

            alert("Your settings have been saved successfully!\n\n(Backend will be connected later.)");

        });

    }

    /* ==========================================
       RESET BUTTON
    ========================================== */

    if (resetBtn) {

        resetBtn.addEventListener("click", function () {

            const inputs = document.querySelectorAll("input");

            inputs.forEach(input => {

                if (input.type === "text") {

                    input.value = "";

                }

                else if (input.type === "email") {

                    input.value = "";

                }

                else if (input.type === "password") {

                    input.value = "";

                }

                else if (input.type === "checkbox") {

                    input.checked = false;

                }

            });

            alert("All fields have been reset.");

        });

    }

    /* ==========================================
       INPUT FOCUS EFFECT
    ========================================== */

    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {

        input.addEventListener("focus", function () {

            this.style.boxShadow = "0 0 8px rgba(30,79,215,0.25)";

        });

        input.addEventListener("blur", function () {

            this.style.boxShadow = "none";

        });

    });

    /* ==========================================
       CARD HOVER EFFECT
    ========================================== */

    const cards = document.querySelectorAll(".setting-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-5px)";
            this.style.transition = "0.3s";
            this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0)";
            this.style.boxShadow = "";

        });

    });

    /* ==========================================
       DARK MODE (DEMO)
    ========================================== */

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    if (checkboxes.length >= 3) {

        const darkMode = checkboxes[2];

        darkMode.addEventListener("change", function () {

            if (this.checked) {

                document.body.style.background = "#1f2937";
                document.body.style.color = "#ffffff";

            } else {

                document.body.style.background = "#f4f7fc";
                document.body.style.color = "#333333";

            }

        });

    }

    /* ==========================================
       PAGE TITLE
    ========================================== */

    document.title = "Settings | Welcome Public School";

});