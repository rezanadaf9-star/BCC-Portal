(() => {
    "use strict";
    const cfg = window.LECTURE_CONFIG || {
    };
    const subjects = Array.isArray(cfg.subjects) ? cfg.subjects : [];
    const lectures = Array.isArray(cfg.recordedLectures) ? cfg.recordedLectures : [];
    const grid = document.querySelector("#recordedSubjectGrid");
    const empty = document.querySelector("#recordedSubjectsEmpty");
    const pageMap = {
        "social-sciences": "recorded-social-sciences.html",
        "science": "recorded-science.html",
        "maths": "recorded-maths.html",
        "hindi": "recorded-hindi.html",
        "english": "recorded-english.html",
        "urdu": "recorded-urdu.html"
    };
    const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ( {
        "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
    }
    [c]));
    function notify(message) {
        const box = document.querySelector("#notificationMessage");
        if (!box) return;
        box.querySelector("span").textContent = message;
        box.classList.add("show");
        clearTimeout(notify.timer);
        notify.timer = setTimeout(() => box.classList.remove("show"), 3000);
    }
    function countFor(subjectName) {
        return lectures.filter(item => String(item.subject || "").toLowerCase() === String(subjectName).toLowerCase()).length;
    }
    function render() {
        grid.innerHTML = "";
        empty.hidden = subjects.length > 0;
        subjects.forEach((subject, index) => {
            const page = pageMap[subject.id] || `recorded-${subject.id}.html`;
            const count = countFor(subject.name);
            const card = document.createElement("a");
            card.className = "recorded-subject-card";
            card.href = page;
            card.innerHTML = `
        <div class="recorded-subject-icon"><i class="fa-solid ${esc(subject.icon || "fa-book-open")}"></i></div>
        <div class="recorded-subject-content">
          <span class="subject-index">SUBJECT ${String(index + 1).padStart(2, "0")}</span>
          <h2>${esc(subject.name)}</h2>
          <p>${esc(subject.description || "View recorded lectures for this subject.")}</p>
          <div class="recorded-subject-footer"><span>${count} lecture${count === 1 ? "" : "s"}</span><i class="fa-solid fa-arrow-right"></i></div>
        </div>`;
            grid.appendChild(card);
        });
    }
    document.querySelector("#notificationBtn")?.addEventListener("click", () => notify("You have no new notifications."));
    render();
})();
