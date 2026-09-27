CODE FORMATTING
================
All HTML, CSS and JavaScript source files in this ZIP are intentionally formatted in a human-readable VS Code style. The code is spaced and indented for manual editing, with simple comments where appropriate.

DIGITAL CLASSROOM — LECTURE DATA GUIDE
==========================================

This project uses lecture-data.js as the central place for lecture information.

You can use:
1. YouTube recorded videos
2. Local MP4 videos
3. YouTube API live detection
4. Manual live mode
5. Backend mode later, if you add a server

IMPORTANT:
- Keep the existing HTML/CSS design files unchanged unless you intentionally want to modify the UI.
- For normal lecture management, edit lecture-data.js.
- Old recorded lectures stay in the data until you manually remove them.
- Newer lectures are displayed before older lectures using their date.

--------------------------------------------------
1. YOUTUBE CONFIGURATION
--------------------------------------------------

Inside lecture-data.js:

youtube: {
    mode: "api",
    channelId: "YOUR_YOUTUBE_CHANNEL_ID",
    apiKey: "YOUR_YOUTUBE_DATA_API_KEY",
    backendEndpoint: ""
}

Available modes:

"api"
    Uses YouTube Data API for live/upcoming information.

"manual"
    Uses the manual liveLecture object below.

"backend"
    Reserved for a future backend. The API key can then stay on
    the server instead of being exposed in browser JavaScript.

If you are using API mode, replace:

YOUR_YOUTUBE_CHANNEL_ID
YOUR_YOUTUBE_DATA_API_KEY

with your actual values.

IMPORTANT SECURITY NOTE:
A browser-based website cannot truly hide an API key if the key is
placed inside lecture-data.js. Restrict the Google Cloud API key by
website/domain and restrict it to YouTube Data API v3.

For genuinely secret API credentials, use backend mode and keep the
key on your server.

--------------------------------------------------
2. MANUAL LIVE MODE
--------------------------------------------------

If YouTube API is unavailable or you simply want to control the live
lecture manually, change:

mode: "manual"

Then edit the liveLecture object.

Example:

liveLecture: {
    isLive: true,
    subject: "Maths",
    chapter: "Quadratic Equations",
    lecture: "Introduction to Quadratic Equations",
    teacher: "Mr. Ahmed",
    videoId: "ABC123XYZ",
    thumbnail: "",
    description: "Live Mathematics lecture."
}

When there is no live lecture:

liveLecture: {
    isLive: false
}

The Learning page will show:

No Live Now
No live lecture for now.

When isLive is true, the live lecture information is used by the
Learning page and the lecture widget.

--------------------------------------------------
3. YOUTUBE VIDEO ID
--------------------------------------------------

For a YouTube URL such as:

https://www.youtube.com/watch?v=ABC123XYZ

use only:

videoId: "ABC123XYZ"

Do NOT put the complete YouTube URL into videoId.

For a YouTube Shorts/live URL, use the actual YouTube video ID.

--------------------------------------------------
4. ADDING A YOUTUBE RECORDED LECTURE
--------------------------------------------------

Add an object inside:

recordedLectures: [

    ...
]

Example:

{
    id: "math-001",
    source: "youtube",
    subject: "Maths",
    chapter: "Quadratic Equations",
    lecture: "Introduction to Quadratic Equations",
    teacher: "Mr. Ahmed",
    videoId: "ABC123XYZ",
    date: "2026-09-18",
    duration: "45 Minutes",
    description: "Introduction to quadratic equations."
}

The lecture will be available through the appropriate subject page.

For example:

Recorded Lectures
    -> Maths
        -> Quadratic Equations
            -> Introduction to Quadratic Equations

The video opens inside the website's lecture widget.

--------------------------------------------------
5. ADDING A LOCAL MP4 LECTURE
--------------------------------------------------

Put the MP4 inside the project's videos folder.

Recommended structure:

videos/
    Maths/
    Science/
    Hindi/
    English/
    Urdu/
    Social Sciences/

Example:

videos/Maths/quadratic-01.mp4

Then add:

{
    id: "math-002",
    source: "local",
    subject: "Maths",
    chapter: "Quadratic Equations",
    lecture: "Solving Quadratic Equations",
    teacher: "Mr. Ahmed",
    videoUrl: "videos/Maths/quadratic-01.mp4",
    date: "2026-09-19",
    duration: "50 Minutes",
    description: "Solving quadratic equations."
}

The path in videoUrl is relative to the webpage/project.

Make sure the spelling and capitalization of the folder and filename
match the actual file.

--------------------------------------------------
6. MIXING YOUTUBE AND LOCAL VIDEOS
--------------------------------------------------

You can use both at the same time.

Example:

recordedLectures: [

    {
        id: "math-001",
        source: "youtube",
        subject: "Maths",
        chapter: "Quadratic Equations",
        lecture: "Introduction",
        videoId: "ABC123XYZ",
        date: "2026-09-18",
        duration: "45 Minutes"
    },

    {
        id: "math-002",
        source: "local",
        subject: "Maths",
        chapter: "Quadratic Equations",
        lecture: "Practice Problems",
        videoUrl: "videos/Maths/practice-01.mp4",
        date: "2026-09-19",
        duration: "40 Minutes"
    }

]

The player automatically uses the correct source.

--------------------------------------------------
7. ADDING TOMORROW'S LECTURE
--------------------------------------------------

Do NOT replace today's lecture.

Simply add another object.

Example:

Today's:

{
    id: "math-001",
    source: "youtube",
    subject: "Maths",
    chapter: "Quadratic Equations",
    lecture: "Introduction",
    videoId: "ABC123XYZ",
    date: "2026-09-18"
}

Tomorrow:

{
    id: "math-002",
    source: "youtube",
    subject: "Maths",
    chapter: "Quadratic Equations",
    lecture: "Advanced Problems",
    videoId: "DEF456XYZ",
    date: "2026-09-19"
}

Both remain available.

The newer lecture is displayed first.

A lecture is not automatically deleted when you add a new lecture.

--------------------------------------------------
8. SIX SUBJECTS
--------------------------------------------------

The project currently supports:

1. Social Sciences
2. Science
3. Maths
4. Hindi
5. English
6. Urdu

The subject pages use the same central lecture data.

You normally do NOT need to manually add lecture cards to:

recorded-maths.html
recorded-science.html
recorded-hindi.html
recorded-english.html
recorded-urdu.html
recorded-social-sciences.html

Instead, add the lecture to lecture-data.js.

--------------------------------------------------
9. CHAPTER-WISE ORGANIZATION
--------------------------------------------------

Every recorded lecture should have:

subject
chapter
lecture

Example:

subject: "Science"
chapter: "Light and Reflection"
lecture: "Reflection of Light"

The subject page groups lectures by chapter.

Use consistent chapter names so related lectures stay together.

--------------------------------------------------
10. LECTURE WIDGET
--------------------------------------------------

YouTube and local lectures open inside the website's lecture widget.

The widget supports:

- Video playback
- Fullscreen
- Close button
- ESC key
- Automatic return to the webpage after a video finishes
- YouTube playback inside the embedded website player

For local MP4 videos, the browser's native video player is used.

For YouTube videos, the YouTube embedded player is used.

The website does not intentionally redirect the student to YouTube
when the lecture finishes.

IMPORTANT:
Because YouTube's embedded player is an official YouTube player,
some standard YouTube controls/links may remain available. A website
cannot reliably remove or block every standard YouTube player feature.

--------------------------------------------------
11. LOCAL VIDEO FOLDER LIMITATION
--------------------------------------------------

Recommended:

Keep the videos inside the project folder:

Digital Classroom/
    videos/
        Maths/
        Science/
        Hindi/
        English/
        Urdu/
        Social Sciences/

A normal webpage cannot silently scan any arbitrary folder on your
computer.

For example, JavaScript cannot automatically scan:

/Users/YourName/Movies/School Lectures/

without the browser explicitly giving the website permission.

If you want the website to select an external folder, a separate
File System Access API feature would need to be implemented.

--------------------------------------------------
12. RUNNING THE PROJECT
--------------------------------------------------

For local development, use a local web server such as VS Code
Live Server rather than opening HTML files directly with file://.

This is especially useful for:

- Local MP4 files
- JavaScript modules/data
- API requests
- Browser security rules

Example:

Digital Classroom/
    learning.html
    lecture-data.js
    videos/
        Maths/
            math-01.mp4

Run the project through your local server and open learning.html.

--------------------------------------------------
13. COMMON MISTAKES
--------------------------------------------------

Wrong:

videoId: "https://www.youtube.com/watch?v=ABC123XYZ"

Correct:

videoId: "ABC123XYZ"

Wrong:

source: "MP4"

Correct:

source: "local"

Wrong:

source: "YT"

Correct:

source: "youtube"

For local videos, wrong:

videoUrl: "math-01.mp4"

if the actual file is:

videos/Maths/math-01.mp4

Correct:

videoUrl: "videos/Maths/math-01.mp4"

--------------------------------------------------
14. BASIC WORKFLOW
--------------------------------------------------

YOUTUBE RECORDED:

1. Upload video to YouTube.
2. Copy its video ID.
3. Add one object to recordedLectures.
4. Set source to "youtube".
5. Save lecture-data.js.
6. Refresh the website.

LOCAL MP4:

1. Put MP4 into the correct videos/subject/ folder.
2. Add one object to recordedLectures.
3. Set source to "local".
4. Set videoUrl to the correct relative path.
5. Save lecture-data.js.
6. Refresh the website.

LIVE:

API mode:
1. Set mode to "api".
2. Add your YouTube channel ID.
3. Add your YouTube Data API key.
4. The website checks YouTube for live status.

Manual mode:
1. Set mode to "manual".
2. Set isLive to true for an active lecture.
3. Enter the lecture information and video ID.
4. Set isLive to false when there is no live lecture.

--------------------------------------------------
15. IMPORTANT FILE
--------------------------------------------------

The main lecture-management file is:

lecture-data.js

Keep your lecture information there.

The HTML/CSS files are responsible for the interface and styling.
The JavaScript files read the data and generate the appropriate
lecture content.

BACKUP:
Keep a backup copy of lecture-data.js before making large changes.

==================================================
END
==================================================
