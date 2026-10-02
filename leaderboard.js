(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  /* Demo data for the UI. Replace with your server leaderboard later. */
  const STUDENTS = [
    { id:"student-002", name:"Falak Fatmi", roll:"BCC10-002", className:"Class 10", score:500, total:500, photo:"images/student2.jpg", rankChange:1 },
    { id:"student-003", name:"Farhan Akhter", roll:"BCC10-003", className:"Class 10", score:499, total:500, photo:"images/student3.jpg", rankChange:-1 },
    { id:"student-004", name:"Farheen Naz", roll:"BCC10-004", className:"Class 10", score:498, total:500, photo:"images/student4.jpg", rankChange:2 },
    { id:"student-001", name:"Meezan Alam", roll:"BCC10-001", className:"Class 10", score:470, total:500, photo:"images/student.jpg", rankChange:1 },
    { id:"student-005", name:"Akram Ilahi", roll:"BCC10-005", className:"Class 10", score:492, total:500, photo:"images/student5.jpg", rankChange:0 },
    { id:"student-006", name:"Nishat Anjum", roll:"BCC10-006", className:"Class 10", score:463, total:500, photo:"images/student6.jpg", rankChange:-1 },
    { id:"student-007", name:"Ayan Khan", roll:"BCC10-007", className:"Class 10", score:463, total:500, photo:"images/student.jpg", rankChange:1 },
    { id:"student-008", name:"Sana Parveen", roll:"BCC10-008", className:"Class 10", score:460, total:500, photo:"images/student2.jpg", rankChange:0 },
    { id:"student-009", name:"Arham Raza", roll:"BCC10-009", className:"Class 10", score:435, total:500, photo:"images/student3.jpg", rankChange:-2 },
    { id:"student-010", name:"Hiba Khan", roll:"BCC10-010", className:"Class 10", score:432, total:500, photo:"images/student4.jpg", rankChange:1 },
    { id:"student-011", name:"Zoya Fatma", roll:"BCC10-011", className:"Class 10", score:430, total:500, photo:"images/student5.jpg", rankChange:0 },
    { id:"student-012", name:"Saad Ahmad", roll:"BCC10-012", className:"Class 10", score:420, total:500, photo:"images/student6.jpg", rankChange:-1 }
  ];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&","&amp;").replaceAll("<","&lt;")
      .replaceAll(">","&gt;").replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function getStudentId() {
    const keys = ["studentId","student_id","currentStudentId","bccStudentId"];
    for (const key of keys) {
      try {
        const value = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (value) return String(value);
      } catch (_) {}
    }
    return "student-001";
  }

  function readHistory() {
    const keys = ["bccQuizAttempts","quizAttempts","quizHistory"];
    const id = getStudentId();

    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);

        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data[id])) return data[id];
        if (data && data[id] && typeof data[id] === "object") return Object.values(data[id]);
      } catch (_) {}
    }
    return [];
  }

  function n(value) {
    const x = Number(value);
    return Number.isFinite(x) ? x : 0;
  }

  function percent(score,total) {
    return total > 0 ? (score / total) * 100 : 0;
  }

  function fmt(value) {
    return Math.round(n(value)).toLocaleString("en-IN");
  }

  function currentStudent() {
    const id = getStudentId();
    return STUDENTS.find(s => String(s.id) === id) || STUDENTS[3];
  }

  function getStats(student) {
    const history = readHistory()
      .filter(x => x && Number.isFinite(Number(x.obtainedMarks)))
      .sort((a,b) => new Date(a.submittedAt || 0) - new Date(b.submittedAt || 0));

    if (!history.length) {
      return {
        score: student.score,
        total: student.total,
        quizzes: 6,
        trend: [68,72,70,76,81,80],
        recent: [
          {title:"Science Quiz 1", subject:"Science", obtainedMarks:42, totalMarks:50, percentage:84},
          {title:"Mathematics Quiz 2", subject:"Mathematics", obtainedMarks:45, totalMarks:50, percentage:90},
          {title:"Social Science Quiz 1", subject:"Social Science", obtainedMarks:38, totalMarks:50, percentage:76},
          {title:"English Quiz 1", subject:"English", obtainedMarks:41, totalMarks:50, percentage:82}
        ],
        subjects: [
          {name:"Mathematics", value:90},
          {name:"Science", value:84},
          {name:"English", value:82},
          {name:"Social Science", value:76},
          {name:"Hindi", value:88}
        ]
      };
    }

    const score = history.reduce((sum,x) => sum + n(x.obtainedMarks),0);
    const total = history.reduce((sum,x) => sum + n(x.totalMarks),0);

    const trend = history.map(x => percent(n(x.obtainedMarks),n(x.totalMarks))).slice(-8);

    const grouped = {};
    history.forEach(x => {
      const subject = x.subjectName || x.subject || "Other";
      grouped[subject] ||= {score:0,total:0};
      grouped[subject].score += n(x.obtainedMarks);
      grouped[subject].total += n(x.totalMarks);
    });

    const subjects = Object.entries(grouped)
      .map(([name,v]) => ({name,value:percent(v.score,v.total)}))
      .sort((a,b) => b.value-a.value)
      .slice(0,6);

    return {
      score,total,quizzes:history.length,
      trend:trend.length ? trend : [percent(score,total)],
      recent:history.slice().reverse().slice(0,5).map(x => ({
        title:x.title || x.quizId || "Quiz",
        subject:x.subjectName || x.subject || "Quiz",
        obtainedMarks:n(x.obtainedMarks),
        totalMarks:n(x.totalMarks),
        percentage:percent(n(x.obtainedMarks),n(x.totalMarks))
      })),
      subjects
    };
  }

  function getRank(students,id) {
    return students.findIndex(s => String(s.id) === String(id)) + 1;
  }

  function crown() {
    return `<div class="lb-crown"></div>`;
  }

  function renderPodium(students,id) {
    const top = [students[1],students[0],students[2]].filter(Boolean);

    $("podium").innerHTML = top.map(student => {
      const rank = students.indexOf(student) + 1;
      const current = String(student.id) === String(id);

      return `
        <div class="podium-place ${rank===1?"first":rank===2?"second":"third"} ${current?"current":""}">
          ${rank===1 ? crown() : ""}
          <img class="podium-profile" src="${escapeHtml(student.photo)}" alt="">
          <span class="podium-rank">${rank===1?"1st":rank===2?"2nd":"3rd"}</span>
          <span class="podium-name">${escapeHtml(student.name)}</span>
          <strong class="podium-score">${fmt(student.score)}</strong>
          <div class="podium-face"></div>
          ${current ? '<span class="podium-you">YOU</span>' : ""}
        </div>`;
    }).join("");
  }

  function renderRanks(students,id) {
    const rank = getRank(students,id);
    const rows = [];

    if (rank <= 10) {
      students.slice(3,10).forEach(s => rows.push(s));
    } else {
      students.slice(3,9).forEach(s => rows.push(s));
      rows.push(null);
      rows.push(students[rank-1]);
    }

    $("rankList").innerHTML = rows.map(student => {
      if (!student) return `<div class="rank-dots">•••</div>`;

      const r = students.indexOf(student)+1;
      const current = String(student.id) === String(id);

      return `
        <div class="rank-row ${current?"current":""}">
          <strong class="rank-number">${r}</strong>
          <div class="rank-student">
            <img src="${escapeHtml(student.photo)}" alt="">
            <div>
              <strong>${escapeHtml(student.name)}</strong>
              <small>${escapeHtml(student.roll)}</small>
            </div>
          </div>
          <strong class="rank-score">${fmt(student.score)}</strong>
        </div>`;
    }).join("");
  }

  function renderImprovement(values) {
    const nums = values.map(Number).filter(Number.isFinite);
    if (!nums.length) return;

    const width = 520;
    const height = 125;
    const padX = 12;
    const padY = 12;
    const min = Math.max(0, Math.min(...nums) - 5);
    const max = Math.min(100, Math.max(...nums) + 5);
    const range = Math.max(1,max-min);

    const points = nums.map((v,i) => {
      const x = nums.length === 1
        ? width/2
        : padX + i*(width-padX*2)/(nums.length-1);
      const y = height-padY-((v-min)/range)*(height-padY*2);
      return [x,y];
    });

    const polyline = points.map(p => p.join(",")).join(" ");
    const area = `${points[0][0]},${height} ${polyline} ${points.at(-1)[0]},${height}`;

    $("improvementChart").innerHTML = `
      <svg class="improvement-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="quizArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffe600" stop-opacity=".52"/>
            <stop offset="100%" stop-color="#ffe600" stop-opacity=".03"/>
          </linearGradient>
        </defs>
        <polygon points="${area}" fill="url(#quizArea)"></polygon>
        <polyline points="${polyline}" fill="none" stroke="#1b1464" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
        ${points.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#ffe600" stroke="#1b1464" stroke-width="2"></circle>`).join("")}
      </svg>`;

    const change = nums.at(-1) - nums[0];
    $("improvementText").textContent = change > 0.4
      ? `↑ ${change.toFixed(1)}%`
      : change < -0.4
        ? `↓ ${Math.abs(change).toFixed(1)}%`
        : "Stable";
    $("improvementText").style.color = change >= 0 ? "#218653" : "#c33a3a";
  }

  function renderSubjects(subjects) {
    $("subjectBars").innerHTML = subjects.map(item => `
      <div class="subject-row">
        <span class="subject-name">${escapeHtml(item.name)}</span>
        <div class="subject-track">
          <div class="subject-fill" style="width:${Math.max(0,Math.min(100,item.value))}%"></div>
        </div>
        <strong class="subject-percent">${item.value.toFixed(0)}%</strong>
      </div>
    `).join("");
  }

  function renderQuizMarks(items) {
    const table = $("quizMarksTable");

    table.innerHTML = `
      <div class="quiz-mark-row header">
        <span>Quiz</span>
        <span>Marks</span>
        <span>%</span>
      </div>
      ${items.map(item => `
        <div class="quiz-mark-row">
          <div class="quiz-mark-title">
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.subject)}</small>
          </div>
          <strong class="quiz-mark-score">${fmt(item.obtainedMarks)} / ${fmt(item.totalMarks)}</strong>
          <strong class="quiz-mark-percent">${item.percentage.toFixed(0)}%</strong>
        </div>
      `).join("")}
    `;

    $("attemptSummary").textContent = `${items.length} recent`;
  }

  function render() {
    const student = currentStudent();
    const history = readHistory();
    const stats = getStats(student);

    const students = STUDENTS.map(s => ({...s}));
    const idx = students.findIndex(s => String(s.id) === String(student.id));

    if (idx >= 0 && history.length) {
      students[idx].score = stats.score;
    }

    students.sort((a,b) => b.score-a.score);

    const rank = getRank(students,student.id);
    const previousRank = rank + n(student.rankChange);
    const rankDelta = previousRank - rank;

    $("headerStudentName").textContent = student.name;
    $("headerStudentPhoto").src = student.photo;

    $("studentPhoto").src = student.photo;
    $("studentName").textContent = student.name;
    $("studentMeta").textContent = `${student.roll} · ${student.className}`;
    $("studentRankBadge").textContent = `#${rank}`;

    $("totalQuizMarks").textContent = fmt(stats.score);
    $("quizPercentage").textContent = `${percent(stats.score,stats.total).toFixed(1)}%`;
    $("quizCount").textContent = stats.quizzes || "—";

    $("rankChange").textContent = rankDelta > 0
      ? `↑ ${rankDelta}`
      : rankDelta < 0
        ? `↓ ${Math.abs(rankDelta)}`
        : "—";
    $("rankChange").style.color = rankDelta > 0 ? "#218653" : rankDelta < 0 ? "#c33a3a" : "#1b1464";

    renderPodium(students,student.id);
    renderRanks(students,student.id);
    renderImprovement(stats.trend);
    renderSubjects(stats.subjects);
    renderQuizMarks(stats.recent);
  }

  function setupMobileSidebar() {
    const sidebar = $("leaderboardSidebar");
    const overlay = $("leaderboardOverlay");
    const heading = document.querySelector(".top-header .page-heading");

    if (!sidebar || !overlay || !heading) return;

    // Keep one hamburger in the DOM. CSS hides it above 768px.
    let button = heading.querySelector(".leaderboard-menu-button");

    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "leaderboard-menu-button";
      button.setAttribute("aria-label", "Open navigation menu");
      button.setAttribute("aria-expanded", "false");
      button.innerHTML = '<i class="fa-solid fa-bars"></i>';
      heading.prepend(button);
    }

    const isMobile = () => window.innerWidth <= 768;

    const close = () => {
      sidebar.classList.remove("open");
      document.body.classList.remove("leaderboard-sidebar-open");
      button.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
      button.innerHTML = '<i class="fa-solid fa-bars"></i>';
    };

    const open = () => {
      if (!isMobile()) return;
      sidebar.classList.add("open");
      document.body.classList.add("leaderboard-sidebar-open");
      button.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close navigation menu");
      button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    };

    button.addEventListener("click", () => {
      if (!isMobile()) return;
      sidebar.classList.contains("open") ? close() : open();
    });

    overlay.addEventListener("click", close);

    sidebar.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", close);
    });

    // If the viewport becomes desktop-sized while the sidebar is open,
    // always return it to its normal desktop state.
    window.addEventListener("resize", () => {
      if (!isMobile()) close();
    });

    close();
  }

  $("leaderboardNotification")?.addEventListener("click",() => {
    const toast = $("leaderboardToast");
    toast.textContent = "No new notifications.";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"),1800);
  });

  setupMobileSidebar();
  render();
})();