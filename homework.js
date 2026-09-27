/* =========================================================
   DIGITAL CLASSROOM — HOMEWORK HOME PAGE

   This page only displays the six subjects.
   Clicking a subject opens homework-subject.html with that
   subject selected.

   The actual Today's Homework list and part cards are handled
   by homework-subject.js.
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       SUBJECTS
       Keep the subject IDs stable because the backend can use
       the same IDs when storing homework.
       --------------------------------------------------------- */
    const subjects = [
        {
            id: "social-sciences",
            name: "Social Sciences",
            icon: "fa-landmark",
            description: "History, Geography, Political Science and Economics."
        },
        {
            id: "science",
            name: "Science",
            icon: "fa-flask",
            description: "Physics, Chemistry, Biology and related work."
        },
        {
            id: "maths",
            name: "Maths",
            icon: "fa-calculator",
            description: "Mathematics homework, problems and assignments."
        },
        {
            id: "hindi",
            name: "Hindi",
            icon: "fa-language",
            description: "Hindi language, literature and written work."
        },
        {
            id: "english",
            name: "English",
            icon: "fa-pen-nib",
            description: "Grammar, literature, writing and assignments."
        },
        {
            id: "urdu",
            name: "Urdu",
            icon: "fa-book-quran",
            description: "Urdu language, literature and written work."
        }
    ];

    const subjectGrid = document.getElementById("homeworkSubjectGrid");

    renderSubjectCards();

    /* ---------------------------------------------------------
       RENDER SUBJECT CARDS
       --------------------------------------------------------- */
    function renderSubjectCards() {
        subjectGrid.innerHTML = "";

        subjects.forEach(function (subject, index) {
            const card = document.createElement("a");

            card.className = "homework-subject-card";
            card.href = "homework-subject.html?subject=" + encodeURIComponent(subject.id);
            card.setAttribute("aria-label", "Open " + subject.name + " homework");

            card.innerHTML = `
                <div class="homework-subject-visual">
                    <div class="homework-subject-icon">
                        <i class="fa-solid ${subject.icon}"></i>
                    </div>
                    <span class="homework-subject-number">
                        SUBJECT ${String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <div class="homework-subject-content">
                    <span class="eyebrow">Homework</span>
                    <h3>${escapeHtml(subject.name)}</h3>
                    <p>${escapeHtml(subject.description)}</p>
                    <span class="homework-subject-arrow">
                        <i class="fa-solid fa-arrow-right"></i>
                    </span>
                </div>
            `;

            subjectGrid.appendChild(card);
        });
    }

    /* ---------------------------------------------------------
       SMALL HTML SAFETY HELPER
       --------------------------------------------------------- */
    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}());
