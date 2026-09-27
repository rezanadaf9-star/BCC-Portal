/* =========================================================
   BCC JITSI MEETING HELPER
   ========================================================= */

function getBCCStudentName() {
    try {
        const session = JSON.parse(localStorage.getItem("bccStudentSession") || "null");
        return session?.name || "Student";
    } catch {
        return "Student";
    }
}

function createBCCMeeting({ domain = "meet.jit.si", roomName, container, displayName = "Student", onJoined, onLeft, onReadyToClose }) {
    if (typeof JitsiMeetExternalAPI === "undefined") {
        throw new Error("Jitsi External API is not loaded.");
    }

    const api = new JitsiMeetExternalAPI(domain, {
        roomName,
        width: "100%",
        height: "100%",
        parentNode: container,
        userInfo: { displayName },
        configOverwrite: {
            prejoinPageEnabled: true,
            disableDeepLinking: true,
            disableAP: true
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
    });

    if (onJoined) api.addEventListener("videoConferenceJoined", onJoined);
    if (onLeft) api.addEventListener("videoConferenceLeft", onLeft);
    if (onReadyToClose) api.addEventListener("readyToClose", onReadyToClose);

    return api;
}
