BCC LEADERBOARD IMPLEMENTATION
==============================

FILES
-----
leaderboard.html
leaderboard.css
leaderboard.js

The uploaded quiz files have also been included with their working names:
quizzes.html / quizzes.css / quizzes.js
quiz-history.html / quiz-history.css / quiz-history.js

WHAT WAS IMPLEMENTED
--------------------
1. Added Leaderboard to the quiz and quiz-history sidebars.
2. Desktop layout uses two columns:
   - Left: Top 3 podium + ranks 4-10.
   - Right: current student's complete performance panel.
3. Rank 1 gets a crown and larger winner treatment.
4. Current student is highlighted wherever their rank appears.
5. If the current student is below rank 10, ranks 4-9 are shown, then a dots separator,
   then the current student's actual rank.
6. Right panel includes:
   - profile photo
   - roll number
   - class
   - current rank
   - total score
   - percentage
   - attempted quizzes/questions
   - accuracy
   - increasing/decreasing trend
   - quiz score trend graph
   - subject-wise accuracy bars
   - quiz summary
   - recent quiz results
7. Mobile/tablet layout collapses into a single-column experience and includes a
   hamburger sidebar for the leaderboard page.
8. Theme follows the existing BCC quiz/history visual language:
   #1b1464 primary, #ffe600 secondary, white cards, Poppins, rounded cards,
   subtle shadows and the existing Digital Classroom structure.

IMPORTANT BACKEND NOTE
----------------------
The browser's localStorage cannot create a real cross-student leaderboard.
The leaderboard page therefore has:
- local demo data so the UI works immediately;
- support for the existing bccQuizAttempts local history;
- a backend-ready leaderboardEndpoint.

For production, set these values in leaderboard.js:

const leaderboardConfig = {
  leaderboardEndpoint: "/api/leaderboard",
  useBackend: true
};

Expected backend response:
{
  "students": [
    {
      "id": "student-id",
      "name": "Student Name",
      "roll": "BCC10-001",
      "className": "Class 10",
      "photo": "images/student.jpg",
      "score": 20500,
      "totalMarks": 28000,
      "percentage": 73.2,
      "rank": 6,
      "rankChange": 2,
      "quizResults": [
        {
          "title": "Science Quiz 1",
          "percentage": 82,
          "score": 41,
          "total": 50,
          "attempted": 20,
          "correct": 17,
          "submittedAt": "2026-09-30T08:00:00+05:30",
          "subject": "Science"
        }
      ]
    }
  ]
}

The real leaderboard should be calculated server-side from submitted quiz attempts.
Do not use client-side localStorage as the authoritative source for rank/marks.

OTHER SIDEBAR PAGES
-------------------
The uploaded files did not include learning.html, notes.html, homework.html or their
shared sidebar source. Add this same link to those pages' Learning Center sidebar:

<a href="leaderboard.html">
  <i class="fa-solid fa-ranking-star"></i><span>Leaderboard</span>
</a>

