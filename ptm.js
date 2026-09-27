/* =========================================================
   PTM LIVE MEETING
   ========================================================= */

const ptmConfig = {
    domain: "meet.jit.si",

    // Change this room from the backend for every scheduled PTM.
    roomName: "BCC-PTM-DEMO",

    displayName: "Student",

    // For production, generate authenticated meeting settings/JWT
    // from your backend instead of exposing secrets in this file.
    requireModerator: false
};

let ptmApi = null;

const ptmWindow = document.getElementById("ptmMeetingWindow");
const jitsiContainer = document.getElementById("jitsi-container");
const jitsiPlaceholder = document.getElementById("jitsiPlaceholder");
const joinJitsiBtn = document.getElementById("joinJitsiBtn");
const meetingStatus = document.getElementById("meetingStatus");
const fullscreenBtn = document.getElementById("ptmFullscreenBtn");
const closeBtn = document.getElementById("ptmCloseBtn");
const cameraIcon = document.getElementById("meetingCameraIcon");
const studentNameMini = document.getElementById("studentNameMini");

function getStudentSession() {
    try {
        return JSON.parse(localStorage.getItem("bccStudentSession") || "null");
    } catch {
        return null;
    }
}

function updateStudentUI() {
    const session = getStudentSession();

    if (session && session.name) {
        studentNameMini.textContent = session.name;
        ptmConfig.displayName = session.name;
    }
}

function setMeetingStatus(text, connected = false) {
    meetingStatus.textContent = text;
    meetingStatus.classList.toggle("connected", connected);
}

function joinPTM() {
    if (typeof JitsiMeetExternalAPI === "undefined") {
        setMeetingStatus("Meeting service unavailable");
        return;
    }

    if (ptmApi) {
        return;
    }

    const options = {
        roomName: ptmConfig.roomName,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainer,

        userInfo: {
            displayName: ptmConfig.displayName
        },

        configOverwrite: {
            prejoinPageEnabled: true,
            disableDeepLinking: true,
            startWithAudioMuted: false,
            startWithVideoMuted: false
        },

        interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            MOBILE_APP_PROMO: false,
            DEFAULT_REMOTE_DISPLAY_NAME: "Participant"
        }
    };

    ptmApi = new JitsiMeetExternalAPI(ptmConfig.domain, options);

    jitsiPlaceholder.style.display = "none";
    jitsiContainer.style.display = "block";

    setMeetingStatus("Joining...", false);

    ptmApi.addEventListener("videoConferenceJoined", () => {
        setMeetingStatus("Connected", true);
        cameraIcon.classList.add("meeting-live");
    });

    ptmApi.addEventListener("videoConferenceLeft", () => {
        // Immediately restore the PTM page instead of allowing Jitsi's
        // internal close/landing page to remain visible.
        leavePTM();
    });

    ptmApi.addEventListener("readyToClose", () => {
        leavePTM();
    });
}

function exitPTMFullscreen() {
    // Leave native browser fullscreen when it is available.
    if (document.fullscreenElement) {
        const exitPromise = document.exitFullscreen();

        if (exitPromise && typeof exitPromise.catch === "function") {
            exitPromise.catch(() => {});
        }
    }

    ptmWindow.classList.remove("ptm-fullscreen");
    document.body.style.overflow = "";

    fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    fullscreenBtn.title = "Full screen";
    fullscreenBtn.setAttribute("aria-label", "Full screen");
}

function restorePTMPreJoinState() {
    // Hide the Jitsi iframe BEFORE disposing it so its own landing/close
    // page can never become visible to the user.
    jitsiContainer.style.display = "none";
    jitsiPlaceholder.style.display = "flex";
    jitsiContainer.innerHTML = "";

    setMeetingStatus("Not joined");
    cameraIcon.classList.remove("meeting-live");
    exitPTMFullscreen();
}

function leavePTM() {
    const api = ptmApi;
    ptmApi = null;

    // Restore our own PTM screen first. This prevents Jitsi's post-call
    // page/branding from being shown after the meeting is closed or ends.
    restorePTMPreJoinState();

    if (api) {
        try {
            api.dispose();
        } catch (error) {
            console.warn("Jitsi cleanup:", error);
        }
    }
}

function toggleFullscreen() {
    if (ptmWindow.classList.contains("ptm-fullscreen")) {
        exitPTMFullscreen();
        return;
    }

    // Use the browser's real fullscreen API when supported. This makes the
    // physical ESC key work reliably even when the Jitsi iframe has focus.
    if (typeof ptmWindow.requestFullscreen === "function") {
        const requestPromise = ptmWindow.requestFullscreen();

        if (requestPromise && typeof requestPromise.then === "function") {
            requestPromise
                .then(() => {
                    ptmWindow.classList.add("ptm-fullscreen");
                    document.body.style.overflow = "hidden";
                })
                .catch(() => {
                    ptmWindow.classList.add("ptm-fullscreen");
                    document.body.style.overflow = "hidden";
                });
        } else {
            ptmWindow.classList.add("ptm-fullscreen");
            document.body.style.overflow = "hidden";
        }
    } else {
        // Fallback for browsers that do not expose the Fullscreen API.
        ptmWindow.classList.add("ptm-fullscreen");
        document.body.style.overflow = "hidden";
    }

    fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    fullscreenBtn.title = "Exit full screen";
    fullscreenBtn.setAttribute("aria-label", "Exit full screen");
}

function closeMeeting() {
    leavePTM();
}


joinJitsiBtn.addEventListener("click", joinPTM);
fullscreenBtn.addEventListener("click", toggleFullscreen);
closeBtn.addEventListener("click", closeMeeting);

document.addEventListener("fullscreenchange", () => {
    // ESC exits native fullscreen at browser level. Keep our UI state in sync.
    if (!document.fullscreenElement && ptmWindow.classList.contains("ptm-fullscreen")) {
        ptmWindow.classList.remove("ptm-fullscreen");
        document.body.style.overflow = "";
        fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        fullscreenBtn.title = "Full screen";
        fullscreenBtn.setAttribute("aria-label", "Full screen");
    }
});

// Fallback ESC handling for browsers where the Jitsi iframe does not
// take focus and the native Fullscreen API is unavailable.
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && ptmWindow.classList.contains("ptm-fullscreen") && !document.fullscreenElement) {
        exitPTMFullscreen();
    }
});

updateStudentUI();
