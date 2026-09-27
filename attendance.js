/* ==========================================
   ATTENDANCE PAGE JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Attendance Page Loaded Successfully!");


    /* ==========================================
       DOWNLOAD BUTTON
    ========================================== */

    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {

        downloadBtn.addEventListener("click", function () {

            alert(
                "Attendance Report download will be connected to the backend later."
            );

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
       SUMMARY CARD HOVER EFFECT
    ========================================== */

    const summaryCards = document.querySelectorAll(".summary-card");

    summaryCards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.transform = "translateY(-8px)";

        });

        card.addEventListener("mouseleave", function () {

            this.style.transform = "translateY(0px)";

        });

    });


    /* ==========================================
       CALENDAR CELL EFFECT
    ========================================== */

    const days = document.querySelectorAll(".calendar-section td");

    days.forEach(day => {

        day.addEventListener("mouseenter", function () {

            if (this.textContent.trim() !== "") {

                this.style.transform = "scale(1.08)";
                this.style.transition = "0.3s";

            }

        });

        day.addEventListener("mouseleave", function () {

            this.style.transform = "scale(1)";

        });

    });


    /* ==========================================
       ATTENDANCE CARD EFFECT
    ========================================== */

    const attendanceCard =
        document.querySelector(".attendance-card");

    if (attendanceCard) {

        attendanceCard.addEventListener("mouseenter", function () {

            this.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.15)";

        });

        attendanceCard.addEventListener("mouseleave", function () {

            this.style.boxShadow = "";

        });

    }


    /* ==========================================
       ATTENDANCE CIRCLE ANIMATION
       
       Percentage + Circular Arc
       Animate together from 0% to target%
    ========================================== */

    const attendanceCircle =
        document.getElementById("attendanceCircle");

    const attendanceValue =
        document.getElementById("attendanceValue");


    if (attendanceCircle && attendanceValue) {

        let currentAttendance = 0;

        function animateAttendance(targetPercentage) {

            const startPercentage = currentAttendance;

            const difference =
                targetPercentage - startPercentage;

            const duration = 1500;

            const startTime = performance.now();


            function animate(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);


                /* ==================================
                   SMOOTH EASING
                ================================== */

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);


                /* ==================================
                   CALCULATE CURRENT VALUE
                ================================== */

                const currentValue =
                    startPercentage +
                    difference * easedProgress;


                /* ==================================
                   UPDATE PERCENTAGE TEXT
                ================================== */

                attendanceValue.textContent =
                    Math.round(currentValue) + "%";


                /* ==================================
                   UPDATE CIRCULAR ARC
                ================================== */

                attendanceCircle.style.setProperty(
                    "--progress",
                    currentValue + "%"
                );


                /* ==================================
                   CONTINUE ANIMATION
                ================================== */

                if (progress < 1) {

                    requestAnimationFrame(animate);

                } else {

                    currentAttendance =
                        targetPercentage;

                }

            }


            requestAnimationFrame(animate);

        }


        /* ==========================================
           TARGET ATTENDANCE
        ========================================== */

        const targetAttendance = 90;


        /* ==========================================
           START ANIMATION
        ========================================== */

        animateAttendance(targetAttendance);


        /* ==========================================
           OPTIONAL GLOBAL FUNCTION
           
           You can change attendance later using:

           updateAttendance(95);

           or

           updateAttendance(100);
        ========================================== */

        window.updateAttendance = function (newPercentage) {

            /* Prevent invalid values */

            newPercentage =
                Math.max(
                    0,
                    Math.min(100, Number(newPercentage))
                );


            animateAttendance(newPercentage);

        };

    }


    /* ==========================================
       DYNAMIC PAGE TITLE
    ========================================== */

    document.title =
        "Attendance | Welcome Public School";

});