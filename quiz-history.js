/* =========================================================
   DIGITAL CLASSROOM — QUIZ HISTORY JAVASCRIPT
   Local demo storage + backend-ready structure.
   ========================================================= */

(function () {
    "use strict";

    const storageKey = "bccQuizAttempts";
    let selectedAttempt = null;

    const $ = (id) => document.getElementById(id);

    initialise();

    function initialise() {
        renderHistory();
        bindEvents();
        openAttemptFromUrl();
    }

    function bindEvents() {
        $("closeAnalysis").addEventListener("click", closeAnalysis);
        $("closeAnalysisSecondary").addEventListener("click", closeAnalysis);
        $("downloadAnalysis").addEventListener("click", () => {
            if (selectedAttempt) downloadAttemptPdf(selectedAttempt);
        });
        $("historyNotification").addEventListener("click", () => {
            notify("Quiz history is stored for the signed-in student.");
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && $("analysisModal").classList.contains("show")) {
                closeAnalysis();
            }
        });
    }

    function getStudentId() {
        return sessionStorage.getItem("bccStudentId") ||
            localStorage.getItem("bccStudentId") ||
            "demo-student";
    }

    function getHistory() {
        try {
            const all = JSON.parse(localStorage.getItem(storageKey) || "{}");
            const history = Array.isArray(all[getStudentId()]) ? all[getStudentId()] : [];
            return history.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        } catch (error) {
            console.error("Quiz history read error:", error);
            return [];
        }
    }

    function renderHistory() {
        const list = $("historyFullList");
        const empty = $("historyPageEmpty");
        const history = getHistory();

        list.innerHTML = "";
        empty.hidden = history.length > 0;
        $("historyCount").textContent = history.length;
        $("historySummaryText").textContent = history.length
            ? history.length + " submitted quiz" + (history.length === 1 ? "" : "zes") + " available for review."
            : "No submitted quizzes yet.";

        history.forEach((attempt) => {
            const card = document.createElement("article");
            card.className = "history-full-card";
            card.innerHTML = `
                <div class="history-full-icon">
                    <i class="fa-solid ${getTypeIcon(attempt.type)}"></i>
                </div>
                <div class="history-full-main">
                    <div class="history-full-top">
                        <span class="history-type">${escapeHtml(formatType(attempt.type))}</span>
                        <span class="history-submitted-badge">SUBMITTED</span>
                    </div>
                    <h3>${escapeHtml(attempt.title || "Quiz")}</h3>
                    <p>${escapeHtml(attempt.quizId || "Quiz ID unavailable")} • ${escapeHtml(formatDate(attempt.submittedAt))}</p>
                </div>
                <div class="history-full-score">
                    <div><strong>${formatMarks(attempt.obtainedMarks)}</strong><span>OBTAINED</span></div>
                    <div><strong>${formatMarks(attempt.totalMarks)}</strong><span>TOTAL</span></div>
                </div>
                <button type="button" class="history-view-button">
                    <i class="fa-solid fa-chart-line"></i> View Analysis
                </button>
            `;
            card.querySelector(".history-view-button").addEventListener("click", () => openAnalysis(attempt));
            list.appendChild(card);
        });
    }

    function openAttemptFromUrl() {
        const quizId = new URLSearchParams(window.location.search).get("quizId");
        if (!quizId) return;
        const attempt = getHistory().find((item) => String(item.quizId) === String(quizId));
        if (attempt) openAnalysis(attempt);
    }

    function openAnalysis(attempt) {
        selectedAttempt = attempt;
        $("analysisTitle").textContent = attempt.title || "Quiz Analysis";
        $("analysisMeta").textContent = "SUBMITTED • " + formatDate(attempt.submittedAt) + " • " + (attempt.quizId || "");

        $("analysisScoreStrip").innerHTML = `
            <div class="analysis-score-item"><span>Obtained Marks</span><strong>${formatMarks(attempt.obtainedMarks)}</strong></div>
            <div class="analysis-score-item"><span>Total Marks</span><strong>${formatMarks(attempt.totalMarks)}</strong></div>
            <div class="analysis-score-item"><span>Correct</span><strong>${attempt.correct}</strong></div>
            <div class="analysis-score-item"><span>Wrong</span><strong>${attempt.wrong}</strong></div>
        `;

        const answerList = $("analysisAnswerList");
        answerList.innerHTML = "";

        (attempt.questions || []).forEach((question, index) => {
            const selected = attempt.answers ? attempt.answers[index] : null;
            const correctIndex = getAnswerIndex(question.answer, question.options || []);
            const isNotAttempted = selected === null || selected === undefined;
            const isCorrect = !isNotAttempted && Number(selected) === Number(correctIndex);
            const userAnswer = isNotAttempted ? "Not attempted" : String(question.options[selected]);
            const correctAnswer = correctIndex >= 0 ? String(question.options[correctIndex]) : "Not available";
            const result = isNotAttempted ? "Not Attempted" : (isCorrect ? "Correct" : "Wrong");

            const item = document.createElement("article");
            item.className = "analysis-answer-item " + (isCorrect ? "correct" : isNotAttempted ? "" : "wrong");
            item.innerHTML = `
                <div class="analysis-answer-question">Q${index + 1}. ${escapeHtml(String(question.question || ""))}</div>
                <div class="analysis-answer-line">Your answer: <strong>${escapeHtml(userAnswer)}</strong></div>
                <div class="analysis-answer-line">Correct answer: <strong>${escapeHtml(correctAnswer)}</strong></div>
                <div class="analysis-answer-line">Result: <strong class="analysis-result">${result}</strong></div>
                ${question.explanation ? `<div class="analysis-answer-line">Explanation: ${escapeHtml(String(question.explanation))}</div>` : ""}
            `;
            answerList.appendChild(item);
        });

        $("analysisModal").classList.add("show");
        $("analysisModal").setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeAnalysis() {
        $("analysisModal").classList.remove("show");
        $("analysisModal").setAttribute("aria-hidden", "true");
        document.body.style.overflow = "auto";
    }

    function downloadAttemptPdf(attempt) {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            notify("PDF service is not loaded. Please check your internet connection and try again.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: "mm", format: "a4" });
        const pageWidth = 210;
        const margin = 16;
        let y = 18;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("BRILLIANT COACHING CENTRE", margin, y);
        y += 8;
        doc.setFontSize(13);
        doc.text("Quiz Analysis", margin, y);
        y += 9;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text("Quiz ID: " + (attempt.quizId || ""), margin, y); y += 5;
        doc.text("Quiz: " + (attempt.title || "Quiz"), margin, y); y += 5;
        doc.text("Status: SUBMITTED", margin, y); y += 5;
        doc.text("Submitted: " + formatDate(attempt.submittedAt), margin, y); y += 9;

        doc.setFont("helvetica", "bold");
        doc.text("Score Summary", margin, y); y += 6;
        doc.setFont("helvetica", "normal");
        doc.text("Obtained: " + formatMarks(attempt.obtainedMarks) + " / " + formatMarks(attempt.totalMarks), margin, y); y += 5;
        doc.text("Correct: " + attempt.correct + "   Wrong: " + attempt.wrong + "   Attempted: " + attempt.attempted + " / " + attempt.totalQuestions, margin, y); y += 9;
        doc.setFont("helvetica", "bold");
        doc.text("Answer Analysis", margin, y); y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);

        (attempt.questions || []).forEach((question, index) => {
            const selected = attempt.answers ? attempt.answers[index] : null;
            const correctIndex = getAnswerIndex(question.answer, question.options || []);
            const userAnswer = selected === null || selected === undefined ? "Not attempted" : String(question.options[selected]);
            const correctAnswer = correctIndex >= 0 ? String(question.options[correctIndex]) : "Not available";
            const result = selected === null || selected === undefined ? "Not Attempted" : (Number(selected) === Number(correctIndex) ? "Correct" : "Wrong");
            const lines = doc.splitTextToSize("Q" + (index + 1) + ". " + String(question.question || ""), pageWidth - margin * 2);

            if (y + lines.length * 4.5 + 20 > 285) {
                doc.addPage();
                y = 18;
            }

            doc.setFont("helvetica", "bold");
            doc.text(lines, margin, y);
            y += lines.length * 4.5 + 2;
            doc.setFont("helvetica", "normal");
            doc.text("Your answer: " + userAnswer, margin + 2, y); y += 4.5;
            doc.text("Correct answer: " + correctAnswer, margin + 2, y); y += 4.5;
            doc.text("Result: " + result, margin + 2, y); y += 7;
        });

        const safeName = String(attempt.title || "quiz-analysis").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
        doc.save(safeName + "-analysis.pdf");
    }

    function getTypeIcon(type) {
        if (type === "monthly") return "fa-calendar-days";
        if (type === "chapter") return "fa-book-bookmark";
        return "fa-calendar-week";
    }

    function formatType(type) {
        if (type === "chapter") return "Chapter-wise";
        return String(type || "Quiz").replace(/^./, (m) => m.toUpperCase());
    }

    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return String(value || "");
        return date.toLocaleString([], { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }

    function formatMarks(value) {
        return Number.isInteger(Number(value)) ? String(Number(value)) : Number(value || 0).toFixed(2);
    }

    function getAnswerIndex(answer, options) {
        if (typeof answer === "number") return answer;
        const trimmed = String(answer == null ? "" : answer).trim();
        if (/^[A-Z]$/i.test(trimmed)) return trimmed.toUpperCase().charCodeAt(0) - 65;
        const exact = options.findIndex((option) => String(option) === trimmed);
        if (exact !== -1) return exact;
        const numeric = Number(trimmed);
        return Number.isInteger(numeric) ? numeric : -1;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function notify(message) {
        $("historyNotificationMessage").textContent = message;
        $("historyNotificationMessage").classList.add("show");
        clearTimeout(notify.timer);
        notify.timer = setTimeout(() => $("historyNotificationMessage").classList.remove("show"), 3500);
    }
})();
