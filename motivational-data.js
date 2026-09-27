/* =========================================================
   MOTIVATIONAL SESSION DATA
   ========================================================= */

const motivationalConfig = {
    backendEndpoint: "",

    /*
     * Set this to true when your backend is ready.
     *
     * Expected endpoint:
     * GET /api/motivational-sessions?studentId=26BCC1001
     */

    useBackend: false,

    /*
     * DEMO SESSION
     *
     * Uncomment/use this object for local testing.
     * Schedule can be ANY date and ANY time.
     */
    demoSession: {
        active: true,
        title: "Building Confidence & Consistency",
        speaker: "Motivational Speaker",
        startAt: "2026-09-18T12:00:00+05:30",
        endAt: "2026-09-18T13:00:00+05:30",
        roomName: "BCC-MOTIVATIONAL-DEMO"
    }
};
