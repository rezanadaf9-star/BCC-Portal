DIGITAL CLASSROOM — HOMEWORK FRONTEND
=====================================

FILES
-----
homework.html
    Main Homework page. Shows the six subject cards.

homework-subject.html
    Subject page. It is opened with:
    homework-subject.html?subject=maths

homework.css
    Homework-specific styles. It uses your EXISTING learning.css
    for the shared Digital Classroom layout, colours and sidebar.

homework.js
    Creates the six subject cards and opens the selected subject page.

homework-subject.js
    Loads Today's Homework, creates subject-part cards, loads a
    selected part's Today's Homework, and opens PDF/JPG files inside
    the website.

IMPORTANT
---------
You already have learning.css in your main project.
DO NOT add another learning.css from this package.

FLOW
----
Homework
  -> Six subject cards
  -> Click Social Sciences
  -> Social Sciences subject page
  -> Today's Homework list
  -> Part cards:
       History
       Geography
       Political Science
       Economics
  -> Click a part
  -> Today's homework for that part
  -> Open PDF/JPG inside the website

SCIENCE PARTS
-------------
Physics
Chemistry
Biology

MATHS PARTS
-----------
Algebra
Geometry
Mensuration
Statistics

HINDI / ENGLISH / URDU PARTS
-----------------------------
Grammar
Literature
Writing

BACKEND
-------
In homework-subject.js, change:

    const homeworkConfig = {
        backendEndpoint: "",
        useBackend: false
    };

to your API endpoint when the backend is ready.

The frontend sends:

    subject
    date

For a selected part it also sends:

    part

Example:

GET /api/homework?subject=social-sciences&date=2026-09-18

GET /api/homework?subject=social-sciences&part=history&date=2026-09-18

The backend can return either:

[
    {
        "id": "history-001",
        "subject": "social-sciences",
        "part": "history",
        "partName": "History",
        "title": "The French Revolution",
        "description": "Complete today's assigned questions.",
        "type": "Today's Homework",
        "fileType": "pdf",
        "fileUrl": "/uploads/homework/history-001.pdf",
        "date": "2026-09-18",
        "teacher": "Mr. Ahmed"
    }
]

or:

{
    "homework": [ ...same objects... ]
}

PDF/JPG VIEWER
--------------
The file opens inside the website in a modal viewer.

ESC closes the viewer.
Clicking the X closes the viewer.
Clicking outside the viewer closes it.

LOCAL FILES
-----------
If you test before the backend exists, use paths such as:

homework/Maths/algebra-01.pdf
homework/Science/physics-01.jpg

The browser should run the project through a local web server such
as VS Code Live Server rather than opening HTML with file://.

DATA OWNERSHIP
--------------
When the backend/admin portal is connected, homework.js should not
need to contain real homework records. The admin portal can create
and update records in the backend, and this frontend simply displays
what the backend returns.
