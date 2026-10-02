BCC QUIZ MARKS LEADERBOARD — FINAL THEME UPDATE
================================================

CHANGES IN THIS VERSION
-----------------------
1. Leaderboard now loads:
   - learning.css
   - quizzes.css
   so the body, main background, sidebar, typography, header and shared colors
   come directly from the same BCC quiz-page theme.

2. Header uses the same .top-header / .page-heading / .header-actions /
   .notification-btn / .profile-mini structure as quizzes.html.

3. Left side remains the simple version:
   - Top 3
   - 3D podium
   - gold jewel crown
   - ranks 4th–10th
   - current student highlight
   - dots + actual rank when the student is below 10th

4. Right side has been changed back to the more detailed version:
   - student profile + rank
   - total quiz marks
   - percentage
   - number of quizzes
   - rank change
   - quiz improvement flow graph
   - subject-wise marks/percentage bars
   - recent quiz marks table

5. The page is specifically for QUIZ MARKS, not overall academic marks.

IMPORTANT
---------
The sample ranking data in leaderboard.js is demo UI data.
For the actual BCC deployment, rankings and marks should come from the backend/database.
The existing quiz code already stores submitted quiz attempts and supports backend submission.
