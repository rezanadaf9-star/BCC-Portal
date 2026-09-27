/* =========================================================
   DIGITAL CLASSROOM — SUBJECT HOMEWORK

   This page is opened after a student selects a subject.

   Page structure:
       Subject
          ↓
       Today's Homework list
          ↓
       Subject Part cards
          ↓
       Selected Part's Today's Homework
          ↓
       PDF / JPG viewer

   BACKEND:
   --------
   Keep backendEndpoint empty until your backend/admin portal is
   ready. The frontend already knows how to request today's data.

   Expected request:
       GET /api/homework?subject=maths&date=YYYY-MM-DD

   Expected optional part request:
       GET /api/homework?subject=maths&part=algebra&date=YYYY-MM-DD

   The backend may return either:
       [ ...homework objects... ]
   or:
       { homework: [ ...homework objects... ] }
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       BACKEND CONFIGURATION
       --------------------------------------------------------- */
    const homeworkConfig = {
        backendEndpoint: "",
        useBackend: false
    };

    /* ---------------------------------------------------------
       FRONTEND TEST DATA

       Keep this empty in normal use.
       Uncomment the examples only when you want to test the
       frontend before the backend is connected.
       --------------------------------------------------------- */
    const homeworkData = [
        /*
        {
            id: "maths-001",
            subject: "maths",
            part: "algebra",
            partName: "Algebra",
            title: "Quadratic Equations — Today's Homework",
            description: "Solve questions 1 to 10.",
            type: "Today's Homework",
            fileType: "pdf",
            fileUrl: "homework/Maths/quadratic-homework.pdf",
            date: "2026-09-18",
            teacher: "Mr. Ahmed"
        },
        {
            id: "science-001",
            subject: "science",
            part: "physics",
            partName: "Physics",
            title: "Light and Reflection",
            description: "Complete the assigned questions.",
            type: "Worksheet",
            fileType: "jpg",
            fileUrl: "homework/Science/light-homework.jpg",
            date: "2026-09-18",
            teacher: "Mr. Khan"
        }
        */

    {
        "id": "geography-001",
        "subject": "social-sciences",
        "part": "geography",
        "partName": "Geography",
        "title": "संसाधन और विकास",
        "description": "Complete today's assigned questions.",
        "type": "Today's Homework",
        "fileType": "pdf",
        "fileUrl": "homework/geography/geography-001.pdf",
        "date": "2026-09-25",
        "teacher": "Zaki Sir"
    },

        
        {
            id: "maths-001",
            subject: "maths",
            part: "algebra",
            partName: "Algebra",
            title: "Quadratic Equations — Today's Homework",
            description: "Solve questions 1 to 10.",
            type: "Today's Homework",
            fileType: "pdf",
            fileUrl: "homework/Maths/quadratic-equations.pdf",
            date: "2026-09-23",
            teacher: "Rehan Sir"
        },
        {
            id: "science-001",
            subject: "science",
            part: "chemistry",
            partName: "Chemistry",
            title: "Chemical Reactions",
            description: "Complete the assigned questions.",
            type: "Worksheet",
            fileType: "jpg",
            fileUrl: "homework/Science/chemical-reaction-hw.jpg",
            date: "2026-09-23",
            teacher: "Rehan Sir"
        },
        {
            id: "social-sciences-001",
            subject: "social-sciences",
            part: "history",
            partName: "History",
            title: "Rise of Nationalism In Europe",
            description: "Complete the assigned questions.",
            type: "Worksheet",
            fileType: "jpg",
            fileUrl: "homework/Social Sciences/rise-of-nationalism-hw.jpg",
            date: "2026-09-23",
            teacher: "Zaki Sir"
        }
        
    ];

    /* ---------------------------------------------------------
       SUBJECT INFORMATION
       --------------------------------------------------------- */
    const subjects = {
        "social-sciences": {
            name: "Social Sciences",
            icon: "fa-landmark",
            description: "History, Geography, Political Science and Economics.",
            parts: [
                { id: "history", name: "History", icon: "fa-landmark" },
                { id: "geography", name: "Geography", icon: "fa-earth-asia" },
                { id: "political-science", name: "Political Science", icon: "fa-scale-balanced" },
                { id: "economics", name: "Economics", icon: "fa-chart-line" }
            ]
        },

        "science": {
            name: "Science",
            icon: "fa-flask",
            description: "Physics, Chemistry, Biology and related work.",
            parts: [
                { id: "physics", name: "Physics", icon: "fa-atom" },
                { id: "chemistry", name: "Chemistry", icon: "fa-vial" },
                { id: "biology", name: "Biology", icon: "fa-dna" }
            ]
        },

        "maths": {
            name: "Maths",
            icon: "fa-calculator",
            description: "Mathematics homework, problems and assignments.",
            parts: []
        },

        "hindi": {
            name: "Hindi",
            icon: "fa-language",
            description: "Hindi language, literature and written work.",
            parts: []
        },

        "english": {
            name: "English",
            icon: "fa-pen-nib",
            description: "Grammar, literature, writing and assignments.",
            parts: []
        },

        "urdu": {
            name: "Urdu",
            icon: "fa-book-quran",
            description: "Urdu language, literature and written work.",
            parts: []
        }
    };

    /* ---------------------------------------------------------
       READ SUBJECT FROM URL
       Example:
           homework-subject.html?subject=social-sciences
       --------------------------------------------------------- */
    const params = new URLSearchParams(window.location.search);
    const selectedSubjectId = params.get("subject");
    const selectedSubject = subjects[selectedSubjectId];

    /* ---------------------------------------------------------
       PAGE ELEMENTS
       --------------------------------------------------------- */
    const subjectPageTitle = document.getElementById("subjectPageTitle");
    const subjectPageDescription = document.getElementById("subjectPageDescription");
    const selectedSubjectIcon = document.getElementById("selectedSubjectIcon");
    const todayHomeworkSubtitle = document.getElementById("todayHomeworkSubtitle");
    const todayDateLabel = document.getElementById("todayDateLabel");
    const todayHomeworkList = document.getElementById("todayHomeworkList");
    const todayHomeworkEmpty = document.getElementById("todayHomeworkEmpty");

    const homeworkPartsSection = document.getElementById("homeworkPartsSection");
    const homeworkPartsGrid = document.getElementById("homeworkPartsGrid");
    const partCountLabel = document.getElementById("partCountLabel");

    const partWorkSection = document.getElementById("partWorkSection");
    const selectedPartTitle = document.getElementById("selectedPartTitle");
    const partHomeworkList = document.getElementById("partHomeworkList");
    const partHomeworkEmpty = document.getElementById("partHomeworkEmpty");
    const closePartViewBtn = document.getElementById("closePartViewBtn");

    const homeworkViewerModal = document.getElementById("homeworkViewerModal");
    const homeworkViewerTitle = document.getElementById("homeworkViewerTitle");
    const homeworkViewerContent = document.getElementById("homeworkViewerContent");
    const closeHomeworkViewerBtn = document.getElementById("closeHomeworkViewer");

    /* ---------------------------------------------------------
       STOP IF THE URL DOES NOT CONTAIN A VALID SUBJECT
       --------------------------------------------------------- */
    if (!selectedSubject) {
        window.location.replace("homework.html");
        return;
    }

    /* ---------------------------------------------------------
       INITIALISE
       --------------------------------------------------------- */
    setupSubjectHeader();
    renderPartCards();
    renderTodayHomework();
    setupEvents();

    /* ---------------------------------------------------------
       SUBJECT HEADER
       --------------------------------------------------------- */
    function setupSubjectHeader() {
        document.title = selectedSubject.name + " Homework | Digital Classroom";

        subjectPageTitle.textContent = selectedSubject.name + " Homework";
        subjectPageDescription.textContent = selectedSubject.description;
        todayHomeworkSubtitle.textContent = "Today's homework uploaded for " + selectedSubject.name + ".";
        selectedSubjectIcon.innerHTML = `<i class="fa-solid ${selectedSubject.icon}"></i>`;
        todayDateLabel.textContent = formatDate(getTodayDate());
        partCountLabel.textContent = selectedSubject.parts.length + " Parts";
    }

    /* ---------------------------------------------------------
       PART CARDS
       --------------------------------------------------------- */
    function renderPartCards() {
        homeworkPartsGrid.innerHTML = "";

        // Only Social Sciences and Science currently have part cards.
        // Other subjects keep the parts section hidden until their
        // subject-specific structure is added later.
        if (selectedSubject.parts.length === 0) {
            homeworkPartsSection.hidden = true;
            return;
        }

        homeworkPartsSection.hidden = false;

        selectedSubject.parts.forEach(function (part, index) {
            const card = document.createElement("button");

            card.type = "button";
            card.className = "homework-part-card";
            card.setAttribute("data-part", part.id);
            card.setAttribute("aria-label", "Open " + part.name + " homework");

            card.innerHTML = `
                <div class="homework-part-icon">
                    <i class="fa-solid ${part.icon}"></i>
                </div>
                <div class="homework-part-number">
                    PART ${String(index + 1).padStart(2, "0")}
                </div>
                <div class="homework-part-content">
                    <span class="eyebrow">${escapeHtml(selectedSubject.name)}</span>
                    <h3>${escapeHtml(part.name)}</h3>
                    <p>View today's ${escapeHtml(part.name)} homework.</p>
                </div>
                <span class="homework-part-arrow">
                    <i class="fa-solid fa-arrow-right"></i>
                </span>
            `;

            card.addEventListener("click", function () {
                openPart(part);
            });

            homeworkPartsGrid.appendChild(card);
        });
    }

    /* ---------------------------------------------------------
       TODAY'S HOMEWORK FOR THE WHOLE SUBJECT
       --------------------------------------------------------- */
    async function renderTodayHomework() {
        showLoadingState(todayHomeworkList, todayHomeworkEmpty);

        try {
            const data = await getHomework({
                subject: selectedSubjectId
            });

            const todayHomework = filterToday(data)
                .filter(function (item) {
                    return normaliseId(item.subject) === selectedSubjectId;
                })
                .sort(sortNewestFirst);

            renderHomeworkCards(
                todayHomework,
                todayHomeworkList,
                todayHomeworkEmpty,
                "No homework has been uploaded for this subject today."
            );
        } catch (error) {
            console.error("Today's homework could not be loaded:", error);

            showEmptyState(
                todayHomeworkList,
                todayHomeworkEmpty,
                "Homework could not be loaded right now. Please try again later."
            );
        }
    }

    /* ---------------------------------------------------------
       OPEN A PART
       --------------------------------------------------------- */
    async function openPart(part) {
        if (!part || selectedSubject.parts.length === 0) {
            return;
        }

        selectedPartTitle.textContent = part.name + " — Homework History";
        partWorkSection.hidden = false;

        showLoadingState(partHomeworkList, partHomeworkEmpty);

        partWorkSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        try {
            // Load the complete history for this part, not just today's uploads.
            const data = await getHomework({
                subject: selectedSubjectId,
                part: part.id,
                allHistory: true
            });

            const partHomework = data
                .filter(function (item) {
                    return normaliseId(item.subject) === selectedSubjectId;
                })
                .filter(function (item) {
                    return normaliseId(item.part) === normaliseId(part.id);
                })
                .sort(sortNewestFirst);

            renderHomeworkCards(
                partHomework,
                partHomeworkList,
                partHomeworkEmpty,
                "No homework has been uploaded for this part yet."
            );
        } catch (error) {
            console.error("Part homework could not be loaded:", error);

            showEmptyState(
                partHomeworkList,
                partHomeworkEmpty,
                "Part homework could not be loaded right now."
            );
        }
    }

    /* ---------------------------------------------------------
       BACK TO PART CARDS
       --------------------------------------------------------- */
    function closePartView() {
        partWorkSection.hidden = true;

        document.querySelector(".homework-parts-section").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    /* ---------------------------------------------------------
       GET HOMEWORK FROM BACKEND OR TEST DATA
       --------------------------------------------------------- */
    async function getHomework(filters) {
        if (!homeworkConfig.useBackend || !homeworkConfig.backendEndpoint) {
            return homeworkData;
        }

        const url = new URL(homeworkConfig.backendEndpoint, window.location.href);

        url.searchParams.set("subject", filters.subject);

        // Today's feed is date-scoped; part history deliberately requests all dates.
        if (!filters.allHistory) {
            url.searchParams.set("date", getTodayDate());
        } else {
            url.searchParams.set("history", "all");
        }

        if (filters.part) {
            url.searchParams.set("part", filters.part);
        }

        const response = await fetch(url.toString(), {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Backend returned HTTP " + response.status);
        }

        const result = await response.json();

        if (Array.isArray(result)) {
            return result;
        }

        if (Array.isArray(result.homework)) {
            return result.homework;
        }

        if (Array.isArray(result.data)) {
            return result.data;
        }

        return [];
    }

    /* ---------------------------------------------------------
       HOMEWORK CARD RENDERING
       --------------------------------------------------------- */
    function renderHomeworkCards(items, container, emptyElement, emptyMessage) {
        container.innerHTML = "";

        if (!items.length) {
            showEmptyState(container, emptyElement, emptyMessage);
            return;
        }

        emptyElement.hidden = true;

        items.forEach(function (homework) {
            container.appendChild(createHomeworkCard(homework));
        });
    }

    function createHomeworkCard(homework) {
        const card = document.createElement("article");
        const fileType = getFileType(homework);
        const typeLabel = homework.type || "Homework";
        const teacherLabel = homework.teacher || "Teacher";

        card.className = "homework-card";

        card.innerHTML = `
            <div class="homework-card-top">
                <div class="homework-file-icon ${fileType}">
                    <i class="fa-solid ${fileType === "pdf" ? "fa-file-pdf" : "fa-image"}"></i>
                </div>
                <span class="homework-type-badge">${escapeHtml(typeLabel)}</span>
            </div>

            <div class="homework-card-body">
                <span class="homework-card-part">
                    ${escapeHtml(homework.partName || getPartName(homework.part))}
                </span>
                <h3>${escapeHtml(homework.title || "Homework")}</h3>
                <p>${escapeHtml(homework.description || "Open the homework file to view today's work.")}</p>
            </div>

            <div class="homework-card-footer">
                <span class="homework-teacher">
                    <i class="fa-solid fa-user"></i>
                    ${escapeHtml(teacherLabel)}
                </span>

                <button type="button" class="homework-open-btn">
                    <span>Open</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;

        card.querySelector(".homework-open-btn").addEventListener("click", function () {
            openHomeworkFile(homework);
        });

        return card;
    }

    /* ---------------------------------------------------------
       PDF / JPG VIEWER
       Smooth gesture / wheel zoom + fit / rotate / fullscreen.
       --------------------------------------------------------- */
    let homeworkViewerZoom = 1;
    let homeworkViewerFitScale = 1;
    let homeworkViewerRotation = 0;
    let currentHomeworkFileType = "";
    let currentHomeworkFileUrl = "";
    let viewerPointers = new Map();
    let viewerPinchDistance = 0;

    function createHomeworkViewerControls() {
        const controls = document.createElement("div");
        controls.className = "homework-viewer-controls";
        controls.innerHTML = `
            <button type="button" class="homework-viewer-action-btn" data-viewer-action="fit" aria-label="Fit to window" title="Fit to window">
                <i class="fa-solid fa-expand"></i>
            </button>
            <button type="button" class="homework-viewer-action-btn" data-viewer-action="rotate" aria-label="Rotate" title="Rotate">
                <i class="fa-solid fa-rotate"></i>
            </button>
            <button type="button" class="homework-viewer-action-btn" data-viewer-action="fullscreen" aria-label="Fullscreen" title="Fullscreen">
                <i class="fa-solid fa-maximize"></i>
            </button>
        `;

        controls.addEventListener("click", function (event) {
            const button = event.target.closest("button[data-viewer-action]");
            if (!button) return;
            const action = button.dataset.viewerAction;
            if (action === "fit") fitHomeworkViewer();
            if (action === "rotate") rotateHomeworkViewer();
            if (action === "fullscreen") toggleHomeworkViewerFullscreen();
        });

        return controls;
    }

    function getHomeworkViewerTarget() {
        return homeworkViewerContent.querySelector(".homework-viewer-image, .homework-pdf-frame");
    }

    function updateHomeworkViewerTransform() {
        const target = getHomeworkViewerTarget();
        if (!target) return;

        if (currentHomeworkFileType === "image") {
            target.style.transform = `rotate(${homeworkViewerRotation}deg) scale(${homeworkViewerZoom})`;
        } else {
            target.style.transform = `rotate(${homeworkViewerRotation}deg) scale(${homeworkViewerZoom})`;
        }
        target.style.transformOrigin = "center center";
    }

    function calculateHomeworkViewerFit() {
        const image = homeworkViewerContent.querySelector(".homework-viewer-image");
        if (!image || !image.naturalWidth || !image.naturalHeight) {
            homeworkViewerFitScale = 1;
            return 1;
        }

        const padding = 24;
        const availableWidth = Math.max(1, homeworkViewerContent.clientWidth - padding * 2);
        const availableHeight = Math.max(1, homeworkViewerContent.clientHeight - padding * 2);
        const rotated = Math.abs(homeworkViewerRotation % 180) === 90;
        const naturalWidth = rotated ? image.naturalHeight : image.naturalWidth;
        const naturalHeight = rotated ? image.naturalWidth : image.naturalHeight;

        homeworkViewerFitScale = Math.min(
            availableWidth / naturalWidth,
            availableHeight / naturalHeight,
            1
        );
        return homeworkViewerFitScale;
    }

    function applyHomeworkImageZoom() {
        const image = homeworkViewerContent.querySelector(".homework-viewer-image");
        if (!image) return;

        const fitScale = calculateHomeworkViewerFit();
        if (homeworkViewerZoom === 1) {
            image.style.width = `${image.naturalWidth}px`;
            image.style.height = `${image.naturalHeight}px`;
            image.style.maxWidth = "none";
            image.style.maxHeight = "none";
            image.style.transform = `rotate(${homeworkViewerRotation}deg) scale(${fitScale})`;
        } else {
            image.style.width = `${image.naturalWidth}px`;
            image.style.height = `${image.naturalHeight}px`;
            image.style.maxWidth = "none";
            image.style.maxHeight = "none";
            image.style.transform = `rotate(${homeworkViewerRotation}deg) scale(${fitScale * homeworkViewerZoom})`;
        }
        image.style.transformOrigin = "center center";
    }

    function applyHomeworkPdfZoom() {
        const iframe = homeworkViewerContent.querySelector(".homework-pdf-frame");
        if (!iframe) return;
        updateHomeworkViewerTransform();
    }

    function setHomeworkViewerZoom(nextZoom, focalX = 0.5, focalY = 0.5) {
        const oldZoom = homeworkViewerZoom;
        homeworkViewerZoom = Math.max(0.25, Math.min(6, nextZoom));
        if (Math.abs(homeworkViewerZoom - oldZoom) < 0.0001) return;

        if (currentHomeworkFileType === "image") {
            applyHomeworkImageZoom();
        } else {
            applyHomeworkPdfZoom();
        }

        // Keep the zoom gesture centered around its touch / cursor position.
        if (homeworkViewerZoom > 1 && homeworkViewerContent.scrollWidth > homeworkViewerContent.clientWidth) {
            const ratio = homeworkViewerZoom / oldZoom;
            homeworkViewerContent.scrollLeft = (homeworkViewerContent.scrollLeft + homeworkViewerContent.clientWidth * focalX) * ratio - homeworkViewerContent.clientWidth * focalX;
            homeworkViewerContent.scrollTop = (homeworkViewerContent.scrollTop + homeworkViewerContent.clientHeight * focalY) * ratio - homeworkViewerContent.clientHeight * focalY;
        }
    }

    function fitHomeworkViewer() {
        homeworkViewerZoom = 1;
        homeworkViewerRotation = 0;
        homeworkViewerContent.scrollLeft = 0;
        homeworkViewerContent.scrollTop = 0;

        if (currentHomeworkFileType === "image") {
            applyHomeworkImageZoom();
        } else {
            applyHomeworkPdfZoom();
        }
    }

    function rotateHomeworkViewer() {
        homeworkViewerRotation = (homeworkViewerRotation + 90) % 360;
        if (currentHomeworkFileType === "image") {
            calculateHomeworkViewerFit();
            applyHomeworkImageZoom();
        } else {
            applyHomeworkPdfZoom();
        }
    }

    async function toggleHomeworkViewerFullscreen() {
        const box = homeworkViewerModal.querySelector(".homework-viewer-box");
        if (!box) return;

        try {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                return;
            }

            if (box.requestFullscreen) {
                await box.requestFullscreen();
            } else if (box.webkitRequestFullscreen) {
                box.webkitRequestFullscreen();
            } else {
                // Fallback for browsers that do not expose the Fullscreen API.
                box.classList.toggle("viewer-fullscreen-fallback");
            }
        } catch (error) {
            console.warn("Fullscreen is not available in this browser.", error);
            box.classList.toggle("viewer-fullscreen-fallback");
        }
    }

    function getPointerDistance() {
        const points = [...viewerPointers.values()];
        if (points.length < 2) return 0;
        const dx = points[0].x - points[1].x;
        const dy = points[0].y - points[1].y;
        return Math.hypot(dx, dy);
    }

    function setupHomeworkViewerGestures() {
        homeworkViewerContent.addEventListener("wheel", function (event) {
            // Mouse wheel and trackpad gestures both provide a continuous delta.
            // Ctrl/Cmd + wheel is also supported for precision trackpad pinch.
            event.preventDefault();
            const rect = homeworkViewerContent.getBoundingClientRect();
            const focalX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            const focalY = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
            const intensity = event.ctrlKey || event.metaKey ? 0.008 : 0.0045;
            const factor = Math.exp(-event.deltaY * intensity);
            setHomeworkViewerZoom(homeworkViewerZoom * factor, focalX, focalY);
        }, { passive: false });

        homeworkViewerContent.addEventListener("pointerdown", function (event) {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
            homeworkViewerContent.setPointerCapture?.(event.pointerId);
            if (viewerPointers.size === 2) {
                viewerPinchDistance = getPointerDistance();
            }
        });

        homeworkViewerContent.addEventListener("pointermove", function (event) {
            if (!viewerPointers.has(event.pointerId)) return;
            const previous = viewerPointers.get(event.pointerId);
            viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

            if (viewerPointers.size === 2) {
                const distance = getPointerDistance();
                if (viewerPinchDistance > 0 && distance > 0) {
                    setHomeworkViewerZoom(homeworkViewerZoom * (distance / viewerPinchDistance));
                }
                viewerPinchDistance = distance;
            } else if (viewerPointers.size === 1 && homeworkViewerZoom > 1 && currentHomeworkFileType === "image") {
                homeworkViewerContent.scrollLeft -= event.clientX - previous.x;
                homeworkViewerContent.scrollTop -= event.clientY - previous.y;
            }
        });

        function releasePointer(event) {
            viewerPointers.delete(event.pointerId);
            if (viewerPointers.size < 2) viewerPinchDistance = 0;
        }
        homeworkViewerContent.addEventListener("pointerup", releasePointer);
        homeworkViewerContent.addEventListener("pointercancel", releasePointer);
        homeworkViewerContent.addEventListener("pointerleave", function (event) {
            if (event.pointerType === "mouse") releasePointer(event);
        });
    }

    function openHomeworkFile(homework) {
        const fileType = getFileType(homework);
        const fileUrl = homework.fileUrl || homework.url || "";

        if (!fileUrl) {
            showNotification("This homework file is not available yet.");
            return;
        }

        currentHomeworkFileType = fileType === "pdf" ? "pdf" : "image";
        currentHomeworkFileUrl = fileUrl;
        homeworkViewerZoom = 1;
        homeworkViewerRotation = 0;

        homeworkViewerTitle.textContent = homework.title || "Homework";
        homeworkViewerContent.innerHTML = "";

        if (currentHomeworkFileType === "image") {
            const image = document.createElement("img");
            image.className = "homework-viewer-image";
            image.src = fileUrl;
            image.alt = homework.title || "Homework image";
            image.draggable = false;

            image.addEventListener("load", function () {
                applyHomeworkImageZoom();
            }, { once: true });

            homeworkViewerContent.appendChild(image);
        } else {
            const iframe = document.createElement("iframe");
            iframe.className = "homework-pdf-frame";
            iframe.src = `${fileUrl}${fileUrl.includes("#") ? "&" : "#"}zoom=page-fit`;
            iframe.title = homework.title || "Homework PDF";
            iframe.setAttribute("loading", "lazy");
            iframe.setAttribute("allow", "fullscreen");
            homeworkViewerContent.appendChild(iframe);
        }

        const viewerBox = homeworkViewerModal.querySelector(".homework-viewer-box");
        if (viewerBox) {
            const oldControls = viewerBox.querySelector(".homework-viewer-controls");
            if (oldControls) oldControls.remove();
            viewerBox.appendChild(createHomeworkViewerControls());
        }

        homeworkViewerModal.classList.add("show");
        homeworkViewerModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("homework-viewer-open");

        if (currentHomeworkFileType === "image") {
            const image = homeworkViewerContent.querySelector(".homework-viewer-image");
            if (image?.complete) applyHomeworkImageZoom();
        }
    }

    function closeHomeworkFile() {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
        viewerPointers.clear();
        viewerPinchDistance = 0;
        homeworkViewerModal.classList.remove("show");
        homeworkViewerModal.setAttribute("aria-hidden", "true");
        homeworkViewerContent.innerHTML = "";
        document.body.classList.remove("homework-viewer-open");
    }

    /* ---------------------------------------------------------
       EVENTS
       --------------------------------------------------------- */
    function setupEvents() {
        closePartViewBtn.addEventListener("click", closePartView);
        closeHomeworkViewerBtn.addEventListener("click", closeHomeworkFile);

        homeworkViewerModal.addEventListener("click", function (event) {
            // Viewer action buttons are handled by their own controls container.
            // Do not handle them again here, otherwise one click can rotate twice.
            if (event.target === homeworkViewerModal) {
                closeHomeworkFile();
            }
        });

        setupHomeworkViewerGestures();

        window.addEventListener("resize", function () {
            if (!homeworkViewerModal.classList.contains("show")) return;
            if (currentHomeworkFileType === "image") applyHomeworkImageZoom();
        });

        document.addEventListener("fullscreenchange", function () {
            if (!homeworkViewerModal.classList.contains("show")) return;
            requestAnimationFrame(function () {
                if (currentHomeworkFileType === "image") applyHomeworkImageZoom();
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                if (homeworkViewerModal.classList.contains("show")) {
                    closeHomeworkFile();
                } else if (!partWorkSection.hidden) {
                    closePartView();
                }
            }
        });
    }

    /* ---------------------------------------------------------
       DATE HELPERS
       --------------------------------------------------------- */
    function getTodayDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return year + "-" + month + "-" + day;
    }

    function isToday(value) {
        if (!value) {
            return false;
        }

        return String(value).slice(0, 10) === getTodayDate();
    }

    function filterToday(items) {
        return items.filter(function (item) {
            return isToday(item.date);
        });
    }

    function formatDate(value) {
        const parts = String(value).split("-");

        if (parts.length !== 3) {
            return "Today";
        }

        const date = new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    function sortNewestFirst(a, b) {
        const dateDifference = String(b.date || b.uploadedAt || b.createdAt || "")
            .localeCompare(String(a.date || a.uploadedAt || a.createdAt || ""));
        if (dateDifference !== 0) return dateDifference;

        // If multiple assignments share a date, use their timestamp when available.
        return String(b.uploadedAt || b.createdAt || b.updatedAt || "")
            .localeCompare(String(a.uploadedAt || a.createdAt || a.updatedAt || ""));
    }

    /* ---------------------------------------------------------
       OTHER HELPERS
       --------------------------------------------------------- */
    function normaliseId(value) {
        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");
    }

    function getPartName(partId) {
        const part = selectedSubject.parts.find(function (item) {
            return item.id === partId;
        });

        return part ? part.name : "Subject Work";
    }

    function getFileType(homework) {
        const explicitType = String(homework.fileType || "").toLowerCase();

        if (explicitType) {
            return explicitType;
        }

        const fileUrl = String(homework.fileUrl || homework.url || "").toLowerCase();

        if (fileUrl.endsWith(".jpg") || fileUrl.endsWith(".jpeg")) {
            return "jpg";
        }

        if (fileUrl.endsWith(".png")) {
            return "png";
        }

        return "pdf";
    }

    function showLoadingState(container, emptyElement) {
        container.innerHTML = "";
        emptyElement.textContent = "Loading today's homework...";
        emptyElement.hidden = false;
    }

    function showEmptyState(container, emptyElement, message) {
        container.innerHTML = "";
        emptyElement.textContent = message;
        emptyElement.hidden = false;
    }

    function showNotification(message) {
        const notification = document.getElementById("notificationMessage");

        if (!notification) {
            return;
        }

        notification.querySelector("span").textContent = message;
        notification.classList.add("show");

        window.setTimeout(function () {
            notification.classList.remove("show");
        }, 2600);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}());
