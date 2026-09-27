/*
* ================================================================
* DIGITAL CLASSROOM - LECTURE DATA
* ================================================================
*
* This is the main file you edit when adding or changing lectures.
* The website pages read their lecture information from this file.
*
* Supported sources:
*   1. YouTube recorded video
*   2. Local MP4 video
*   3. YouTube API live mode
*   4. Manual live mode (backup)
*
* You normally do NOT need to edit the HTML files when adding a
* new recorded lecture.
*/
window.LECTURE_CONFIG = {
    // ============================================================
    // YOUTUBE SETTINGS
    // ============================================================
    // mode: "api"    -> automatically check YouTube for live classes
    // mode: "manual" -> use the manualLiveLecture object below
    // mode: "backend"-> use your own backend later
    //
    // IMPORTANT:
    // A browser cannot truly hide an API key stored in JavaScript.
    // Restrict the key in Google Cloud to YouTube Data API v3 and
    // your website/domain. For a genuinely secret key, use backend mode.
    youtube: {
        mode: "api",
        // Your YouTube channel ID.
        channelId: "YOUR_YOUTUBE_CHANNEL_ID",
        // Your Google Cloud YouTube Data API v3 key.
        apiKey: "YOUR_YOUTUBE_DATA_API_KEY",
        // Leave empty until you create your own backend.
        backendEndpoint: ""
    },
    // ============================================================
    // SCHOOL / WEBSITE BRANDING
    // ============================================================
    branding: {
        logo: "images/logo.png",
        schoolName: "BRILLIANT COACHING CENTRE",
        footerName: "Brilliant Coaching Centre"
    },
    // ============================================================
    // MANUAL LIVE LECTURE - BACKUP OPTION
    // ============================================================
    // Use this only when youtube.mode is "manual".
    //
    // Set isLive to true when a live lecture is running.
    // Set isLive to false when there is no live lecture.
    //
    // For YouTube, use only the video ID, NOT the complete URL.
    // Example:
    // https://www.youtube.com/watch?v=ABC123XYZ
    // videoId should be: "ABC123XYZ"
    //
    // Example manual live lecture:
    //
    // manualLiveLecture: {
    //     isLive: true,
    //     subject: "Maths",
    //     chapter: "Quadratic Equations",
    //     lecture: "Introduction to Quadratic Equations",
    //     teacher: "Mr. Ahmed",
    //     videoId: "ABC123XYZ",
    //     description: "Live Mathematics lecture."
    // },
    //
    // When there is no live lecture:
    // manualLiveLecture: {
    //     isLive: false
    // }
    manualLiveLecture: {
        isLive: false
    },
    // ============================================================
    // SUBJECTS
    // ============================================================
    // These six subject cards are used by the Recorded Lectures page.
    subjects: [
    {
        id: "social-sciences",
        name: "Social Sciences",
        icon: "fa-landmark",
        description: "History, Geography, Civics and Economics",
        folder: "Social Sciences"
    },
    {
        id: "science",
        name: "Science",
        icon: "fa-flask",
        description: "Physics, Chemistry and Biology",
        folder: "Science"
    },
    {
        id: "maths",
        name: "Maths",
        icon: "fa-calculator",
        description: "Formulas, examples and solved problems",
        folder: "Maths"
    },
    {
        id: "hindi",
        name: "Hindi",
        icon: "fa-language",
        description: "Chapters, grammar and writing",
        folder: "Hindi"
    },
    {
        id: "english",
        name: "English",
        icon: "fa-pen-nib",
        description: "Literature, grammar and writing skills",
        folder: "English"
    },
    {
        id: "urdu",
        name: "Urdu",
        icon: "fa-book-quran",
        description: "Lessons, grammar and literature",
        folder: "Urdu"
    }
    ],
    // ============================================================
    // UPCOMING LECTURES - MANUAL FALLBACK
    // ============================================================
    // Normally upcoming YouTube scheduled streams are detected by
    // the YouTube API. These entries are only a fallback if the API
    // is unavailable.
    upcomingFallback: [
    // {
    //     id: "upcoming-001",
    //     date: "2026-09-18",
    //     time: "16:00",
    //     subject: "Maths",
    //     title: "Quadratic Equations",
    //     room: "Online"
    // }
    ],
    // ============================================================
    // RECORDED LECTURES
    // ============================================================
    // Add new lectures inside this array.
    //
    // IMPORTANT:
    // Old lectures are NOT automatically deleted when you add a new one.
    // The pages sort lectures from newest date to oldest date and group
    // them by chapter.
    //
    // ------------------------------------------------------------
    // YOUTUBE RECORDED LECTURE FORMAT
    // ------------------------------------------------------------
    // {
    //     id: "math-youtube-001",
    //     source: "youtube",
    //     subject: "Maths",
    //     chapter: "Quadratic Equations",
    //     lecture: "Introduction to Quadratic Equations",
    //     teacher: "Mr. Ahmed",
    //     videoId: "ABC123XYZ",
    //     date: "2026-09-18",
    //     duration: "45 Minutes",
    //     description: "Introduction to quadratic equations."
    // }
    //
    // ------------------------------------------------------------
    // LOCAL MP4 LECTURE FORMAT
    // ------------------------------------------------------------
    // Put the video inside the project, for example:
    // videos/Maths/quadratic-01.mp4
    //
    // Then use:
    // {
    //     id: "math-local-001",
    //     source: "local",
    //     subject: "Maths",
    //     chapter: "Quadratic Equations",
    //     lecture: "Solving Quadratic Equations",
    //     teacher: "Mr. Ahmed",
    //     videoUrl: "videos/Maths/quadratic-01.mp4",
    //     date: "2026-09-19",
    //     duration: "50 Minutes",
    //     description: "Solving quadratic equations."
    // }
    //
    // IMPORTANT FOR LOCAL MP4:
    // A normal webpage cannot silently scan any arbitrary folder on
    // your computer. Keep the videos inside the project (or serve them
    // from the same web server) and give the relative path in videoUrl.
    recordedLectures: [
    // ========================================================
    // ADD YOUR YOUTUBE OR LOCAL RECORDED LECTURES HERE.
    // ========================================================
    // ---------------- YOUTUBE EXAMPLE ----------------
    // {
    //     id: "math-youtube-001",
    //     source: "youtube",
    //     subject: "Maths",
    //     chapter: "Quadratic Equations",
    //     lecture: "Introduction to Quadratic Equations",
    //     teacher: "Mr. Ahmed",
    //     videoId: "ABC123XYZ",
    //     date: "2026-09-18",
    //     duration: "45 Minutes",
    //     description: "Introduction to quadratic equations."
    // },
    // ---------------- LOCAL MP4 EXAMPLE ----------------

    {
        id: "social-sciences-local-001",
        source: "local",
        subject: "Social Sciences",
        chapter: "भारत का मानचित्र (नक्शा) , Indian Map",
        lecture: "Indian Map In a simple way",
        teacher: "Zaki Sir Alig",
        videoUrl: "videos/Social Sciences/Geography-01.mp4",
        date: "2026-09-26",
        duration: "5 Minutes",
        description: "Indian Map in a simple way with tricks and stories."
    }
    ],
    // ============================================================
    // DOWNLOADED / OFFLINE LECTURES
    // ============================================================
    // These can be local MP4 files. They use the same video widget.
    downloadedLectures: [
    // Example:
    // {
    //     id: "offline-001",
    //     source: "local",
    //     subject: "English",
    //     chapter: "Grammar",
    //     lecture: "Grammar Essentials",
    //     videoUrl: "videos/English/grammar-essentials.mp4",
    //     date: "2026-09-17",
    //     duration: "42 Minutes",
    //     size: "180 MB"
    // }
    ],
    // ============================================================
    // MISSED LECTURES
    // ============================================================
    // Add only real missed-lecture records supplied by your system.
    // The same YouTube/local source format can be used here.
    missedLectures: [
    // YouTube example:
    // {
    //     id: "missed-001",
    //     source: "youtube",
    //     subject: "Science",
    //     chapter: "Light",
    //     lecture: "Reflection of Light",
    //     videoId: "ABC123XYZ",
    //     date: "2026-09-17",
    //     duration: "45 Minutes"
    // }
    // Local example:
    // {
    //     id: "missed-002",
    //     source: "local",
    //     subject: "Maths",
    //     chapter: "Algebra",
    //     lecture: "Algebra Basics",
    //     videoUrl: "videos/Maths/algebra-basics.mp4",
    //     date: "2026-09-16",
    //     duration: "40 Minutes"
    // }
    ]
};
