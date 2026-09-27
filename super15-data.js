/* =========================================================
   SUPER 15 CONFIGURATION
   ========================================================= */

const super15Config = {
    backendEndpoint: "",
    useBackend: false,

    /*
     * Frontend demo list.
     *
     * In production, move this list to the backend/admin database.
     * Do NOT store student passwords here.
     */
    demoStudents: [
        "26BCC1001"
    ],

    /*
     * Demo sessions are examples only.
     * Previous Digital Classroom pages can be linked from the sidebar.
     */
    demoSessions: [
        {
            id: "super-session-1",
            title: "Problem Solving & Practice Strategy",
            teacher: "Super 15 Faculty",
            startAt: "2026-09-18T16:00:00+05:30",
            endAt: "2026-09-18T17:00:00+05:30",
            roomName: "BCC-SUPER15-PRACTICE"
        }
    ]
};
