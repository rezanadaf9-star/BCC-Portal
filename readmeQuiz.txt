BCC Quiz System — readmeQuiz.txt
================================

This guide explains how to add, edit, schedule, disable, and organize
multiple Weekly, Monthly, and Chapter-wise quizzes in quizzes.js.

IMPORTANT:
- Every quiz must have its own UNIQUE id.
- The "type" controls the quiz category.
- startAt/endAt control when the quiz is active.
- Do NOT reuse the same id for two different quizzes.
- Do NOT change the quiz system functions unless you know what you are doing.
- After editing quizzes.js, refresh the page through Live Server.

============================================================
1. BASIC QUIZ OBJECT FORMAT
============================================================

Every quiz is an object inside:

    const demoQuizData = [
        ...
    ];

The general format is:

    {
        id: "weekly-demo-001",
        type: "weekly",
        title: "Weekly Science Quiz Class 10",
        startAt: "2026-09-25T19:30:00+05:30",
        endAt: "2026-09-28T10:00:00+05:30",
        durationMinutes: 25,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

The same structure can be used for:
- weekly
- monthly
- chapter

Only the "type" changes.

============================================================
2. UNIQUE ID — MOST IMPORTANT
============================================================

Each quiz needs a different id.

Examples:

    id: "weekly-demo-001"
    id: "weekly-demo-002"
    id: "weekly-demo-003"

Monthly:

    id: "monthly-demo-001"
    id: "monthly-demo-002"

Chapter-wise:

    id: "chapter-science-001"
    id: "chapter-science-002"
    id: "chapter-maths-001"

You can create your own naming system.

For example:

    id: "weekly-class10-science-001"
    id: "weekly-class10-science-002"

The ID is used to identify the quiz, save attempts, save drafts,
and keep quiz history separate.

NEVER do this:

    id: "weekly-demo-001"
    id: "weekly-demo-001"

Two quizzes must never have the same ID.

============================================================
3. TYPE — THIS CONTROLS THE CATEGORY
============================================================

Weekly:

    type: "weekly"

Monthly:

    type: "monthly"

Chapter-wise:

    type: "chapter"

The type is NOT the quiz ID.

For example:

    {
        id: "science-test-001",
        type: "weekly",
        ...
    }

This is still a WEEKLY quiz because:

    type: "weekly"

You can use any unique ID you want.

============================================================
4. TITLE
============================================================

"title" is the name students see.

Example:

    title: "Weekly Science Quiz Class 10"

Other examples:

    title: "Weekly Maths Quiz - Algebra"

    title: "Monthly Science Assessment"

    title: "Chapter 3 - Metals and Non-metals"

You can change the title without changing the ID.

============================================================
5. START DATE AND TIME
============================================================

Format:

    startAt: "YYYY-MM-DDTHH:MM:SS+05:30"

Example:

    startAt: "2026-09-25T19:30:00+05:30"

Meaning:

    2026 = year
    09   = month (September)
    25   = day
    T    = separates date and time
    19   = hour in 24-hour format
    30   = minutes
    00   = seconds
    +05:30 = India Standard Time (IST)

Therefore:

    2026-09-25T19:30:00+05:30
    = 25 September 2026, 7:30 PM IST

Examples:

9:00 AM:

    "2026-09-25T09:00:00+05:30"

12:00 PM:

    "2026-09-25T12:00:00+05:30"

3:30 PM:

    "2026-09-25T15:30:00+05:30"

7:30 PM:

    "2026-09-25T19:30:00+05:30"

11:00 PM:

    "2026-09-25T23:00:00+05:30"

============================================================
6. END DATE AND TIME
============================================================

Format is exactly the same:

    endAt: "YYYY-MM-DDTHH:MM:SS+05:30"

Example:

    endAt: "2026-09-28T10:00:00+05:30"

Meaning:

    28 September 2026
    10:00 AM IST

A quiz is active between startAt and endAt.

Example:

    startAt: "2026-09-25T19:30:00+05:30",
    endAt:   "2026-09-28T10:00:00+05:30",

This means the quiz can be opened from:

    25 September 2026, 7:30 PM IST

until:

    28 September 2026, 10:00 AM IST

============================================================
7. DURATION
============================================================

This is the time allowed after the student STARTS the quiz.

Example:

    durationMinutes: 25,

means:

    25 minutes

Examples:

    durationMinutes: 10
    durationMinutes: 20
    durationMinutes: 30
    durationMinutes: 60

IMPORTANT:
startAt/endAt = when the quiz is available.

durationMinutes = how long a student's attempt lasts after starting.

They are different things.

============================================================
8. MARKS
============================================================

Example:

    marksPerQuestion: 1,

means each correct answer gives 1 mark.

Example:

    negativeMarks: 0.25,

means a wrong answer loses 0.25 marks.

For no negative marking:

    negativeMarks: 0,

Example:

    marksPerQuestion: 2,
    negativeMarks: 0.5,

means:
- Correct = +2
- Wrong = -0.5

============================================================
9. QUESTIONS FORMAT
============================================================

Inside:

    questions: [

add question objects.

Example:

    questions: [
        {
            id: "science-001",
            question: "कोशिका का पावरहाउस किस कोशिकांग को कहा जाता है?",
            options: [
                "केंद्रक",
                "राइबोसोम",
                "माइटोकॉन्ड्रिया",
                "गॉल्जी तंत्र"
            ],
            question_en: "Which organelle is known as the powerhouse of the cell?",
            options_en: [
                "Nucleus",
                "Ribosome",
                "Mitochondria",
                "Golgi Apparatus"
            ],
            answer: 2,
            explanation: "Mitochondria produce ATP."
        }
    ]

IMPORTANT:
"answer" uses ZERO-BASED INDEXING.

First option:

    answer: 0

Second option:

    answer: 1

Third option:

    answer: 2

Fourth option:

    answer: 3

Therefore, in the example above:

    "Mitochondria"

is option number 3 to a student, but:

    answer: 2

in JavaScript.

============================================================
10. QUESTION ID
============================================================

Each question should have an ID.

Example:

    id: "science-001"

Then:

    id: "science-002"

Then:

    id: "science-003"

For another quiz you can use:

    id: "math-001"

or:

    id: "weekly2-q001"

The quiz itself MUST have a unique quiz ID.

Question IDs should also be kept unique within that quiz.

============================================================
11. ADDING A SECOND WEEKLY QUIZ
============================================================

Suppose you already have:

    {
        id: "weekly-demo-001",
        type: "weekly",
        title: "Weekly GK Quiz",
        ...
    }

To add another weekly quiz, add another COMPLETE object.

Example:

    {
        id: "weekly-demo-002",
        type: "weekly",
        title: "Weekly Science Quiz",
        startAt: "2026-09-25T19:30:00+05:30",
        endAt: "2026-09-28T10:00:00+05:30",
        durationMinutes: 25,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            {
                id: "science-001",
                question: "Your question here?",
                options: [
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
                ],
                question_en: "Your question in English?",
                options_en: [
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
                ],
                answer: 1,
                explanation: "Explanation here."
            }
        ]
    },

IMPORTANT:
Put a comma after the previous quiz object before adding the next object.

============================================================
12. ADDING MULTIPLE WEEKLY QUIZZES
============================================================

You can have:

    {
        id: "weekly-demo-001",
        type: "weekly",
        ...
    },

    {
        id: "weekly-demo-002",
        type: "weekly",
        ...
    },

    {
        id: "weekly-demo-003",
        type: "weekly",
        ...
    },

    {
        id: "weekly-demo-004",
        type: "weekly",
        ...
    }

All of them are Weekly quizzes because:

    type: "weekly"

Each one has its own ID and schedule.

============================================================
13. MULTIPLE MONTHLY QUIZZES
============================================================

Use:

    type: "monthly"

Example:

    {
        id: "monthly-demo-001",
        type: "monthly",
        title: "Monthly Science Assessment",
        startAt: "2026-10-01T09:00:00+05:30",
        endAt: "2026-10-05T23:00:00+05:30",
        durationMinutes: 40,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

Second monthly quiz:

    {
        id: "monthly-demo-002",
        type: "monthly",
        title: "Monthly Maths Assessment",
        startAt: "2026-10-10T09:00:00+05:30",
        endAt: "2026-10-15T23:00:00+05:30",
        durationMinutes: 40,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

============================================================
14. MULTIPLE CHAPTER QUIZZES
============================================================

Use:

    type: "chapter"

A chapter quiz should normally also contain a subject.

Example:

    {
        id: "chapter-science-001",
        type: "chapter",
        subject: "science",
        chapter: "Chapter 1 - Chemical Reactions",
        title: "Science Chapter 1 Quiz",
        startAt: "2026-09-25T09:00:00+05:30",
        endAt: "2026-09-30T23:00:00+05:30",
        durationMinutes: 20,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    }

Another chapter quiz:

    {
        id: "chapter-science-002",
        type: "chapter",
        subject: "science",
        chapter: "Chapter 2 - Acids, Bases and Salts",
        title: "Science Chapter 2 Quiz",
        ...
    }

Another subject:

    {
        id: "chapter-maths-001",
        type: "chapter",
        subject: "maths",
        chapter: "Chapter 1 - Real Numbers",
        title: "Maths Chapter 1 Quiz",
        ...
    }

============================================================
15. MULTIPLE QUIZZES CAN BE ACTIVE
============================================================

You can schedule several quizzes so their active periods overlap.

Example:

    weekly-demo-001
    09:00 → 10:00

    weekly-demo-002
    10:00 → 11:00

or:

    weekly-demo-001
    25 Sep → 28 Sep

    weekly-demo-002
    25 Sep → 30 Sep

The system uses each quiz's own ID and schedule.

If multiple quizzes are active at the same time, they can all be displayed
in the corresponding quiz section.

============================================================
16. HOW TO COPY AN EXISTING QUIZ
============================================================

The easiest method is:

1. Find the complete existing quiz object.
2. Copy the COMPLETE object.
3. Paste it after the original.
4. Change the quiz ID.
5. Change title if needed.
6. Change startAt.
7. Change endAt.
8. Change questions if needed.
9. Change subject/chapter if it is a chapter quiz.

Example:

Original:

    id: "weekly-demo-005",

Copied version:

    id: "weekly-demo-006",

DO NOT leave both as:

    id: "weekly-demo-005"

============================================================
17. IF YOU WANT THE SAME QUESTIONS AGAIN
============================================================

You can copy the complete quiz and keep the same question content.

Change the QUIZ ID:

    weekly-demo-005

to:

    weekly-demo-006

The new quiz will then have a separate quiz history/attempt identity.

Example:

    {
        id: "weekly-demo-006",
        type: "weekly",
        title: "Weekly Science Quiz - Repeat",
        startAt: "2026-09-25T19:30:00+05:30",
        endAt: "2026-09-28T10:00:00+05:30",
        ...
    }

You may keep the same question text/options if that is intentional.

============================================================
18. IMPORTANT: DO NOT CHANGE THESE FUNCTIONS FOR NORMAL QUIZ ADDING
============================================================

For normal quiz creation/editing, you should NOT need to change:

    getQuizzes()
    getQuiz()
    refreshStatus()
    isQuizActive()
    openScheduledQuiz()
    showSubjectQuizzes()
    startQuiz()

The corrected quiz system is designed so you normally only edit:

    demoQuizData

and add/edit quiz objects.

============================================================
19. WHERE TO PASTE A NEW QUIZ
============================================================

Find:

    const demoQuizData = [

You will see existing quiz objects.

Paste your new quiz object:

    {
        id: "...",
        type: "...",
        title: "...",
        startAt: "...",
        endAt: "...",
        durationMinutes: ...,
        marksPerQuestion: ...,
        negativeMarks: ...,
        questions: [
            ...
        ]
    },

inside the array.

Example:

    const demoQuizData = [

        {
            id: "weekly-demo-001",
            type: "weekly",
            ...
        },

        // ADD NEW QUIZ HERE

        {
            id: "weekly-demo-002",
            type: "weekly",
            ...
        },

        {
            id: "monthly-demo-001",
            type: "monthly",
            ...
        }

    ];

============================================================
20. COMMAS — VERY IMPORTANT
============================================================

Objects inside demoQuizData must be separated by commas.

Correct:

    {
        id: "weekly-demo-001",
        ...
    },

    {
        id: "weekly-demo-002",
        ...
    }

Wrong:

    {
        id: "weekly-demo-001",
        ...
    }

    {
        id: "weekly-demo-002",
        ...
    }

The missing comma will cause JavaScript errors.

============================================================
21. HOW TO DISABLE A QUIZ WITHOUT DELETING IT
============================================================

You can use:

    active: false,

Example:

    {
        id: "weekly-demo-003",
        type: "weekly",
        active: false,
        title: "Old Weekly Quiz",
        ...
    }

This keeps the quiz in the file but prevents it from being active.

To enable it again:

    active: true,

or simply remove:

    active: false

The schedule is still controlled by startAt/endAt.

============================================================
22. SCHEDULE RULE
============================================================

There is NO automatic rule such as:

- only Sunday
- only first day of month
- only one weekly quiz
- only one monthly quiz

The schedule is based on the quiz's configured startAt/endAt.

Example:

    startAt: "2026-09-25T09:00:00+05:30",
    endAt: "2026-09-25T12:00:00+05:30",

means it is available on 25 September from 9 AM to 12 PM IST.

============================================================
23. EXAMPLE — COMPLETE WEEKLY QUIZ
============================================================

Paste this pattern into demoQuizData:

    {
        id: "weekly-demo-010",
        type: "weekly",
        title: "Weekly Science Quiz Class 10",
        startAt: "2026-09-25T19:30:00+05:30",
        endAt: "2026-09-28T10:00:00+05:30",
        durationMinutes: 25,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            {
                id: "science-010-001",
                question: "Your Hindi question?",
                options: [
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 4"
                ],
                question_en: "Your English question?",
                options_en: [
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 4"
                ],
                answer: 2,
                explanation: "Explanation."
            }
        ]
    },

============================================================
24. EXAMPLE — COMPLETE MONTHLY QUIZ
============================================================

    {
        id: "monthly-demo-010",
        type: "monthly",
        title: "Monthly Science Quiz",
        startAt: "2026-10-01T09:00:00+05:30",
        endAt: "2026-10-05T23:00:00+05:30",
        durationMinutes: 40,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

============================================================
25. EXAMPLE — COMPLETE CHAPTER QUIZ
============================================================

    {
        id: "chapter-science-010",
        type: "chapter",
        subject: "science",
        chapter: "Chapter 5 - Life Processes",
        title: "Science Chapter 5 Quiz",
        startAt: "2026-09-25T09:00:00+05:30",
        endAt: "2026-10-01T23:00:00+05:30",
        durationMinutes: 20,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

============================================================
26. WHAT TO CHANGE WHEN ADDING A NEW QUIZ
============================================================

At minimum, change these:

    1. id
    2. type
    3. title
    4. startAt
    5. endAt
    6. questions

For chapter quizzes, also set:

    subject
    chapter

You can optionally change:

    durationMinutes
    marksPerQuestion
    negativeMarks

============================================================
27. QUICK COPY TEMPLATE
============================================================

WEEKLY:

    {
        id: "weekly-demo-XXX",
        type: "weekly",
        title: "YOUR TITLE",
        startAt: "YYYY-MM-DDTHH:MM:SS+05:30",
        endAt: "YYYY-MM-DDTHH:MM:SS+05:30",
        durationMinutes: 25,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

MONTHLY:

    {
        id: "monthly-demo-XXX",
        type: "monthly",
        title: "YOUR TITLE",
        startAt: "YYYY-MM-DDTHH:MM:SS+05:30",
        endAt: "YYYY-MM-DDTHH:MM:SS+05:30",
        durationMinutes: 40,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

CHAPTER:

    {
        id: "chapter-subject-XXX",
        type: "chapter",
        subject: "science",
        chapter: "YOUR CHAPTER",
        title: "YOUR TITLE",
        startAt: "YYYY-MM-DDTHH:MM:SS+05:30",
        endAt: "YYYY-MM-DDTHH:MM:SS+05:30",
        durationMinutes: 20,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        questions: [
            ...
        ]
    },

============================================================
28. AFTER SAVING THE FILE
============================================================

1. Save quizzes.js.
2. Keep the BCC project running through Live Server.
3. Refresh quizzes.html.
4. If the old result still appears, do a hard refresh.
5. Make sure the new quiz's current time is between startAt and endAt.
6. Check that the quiz ID is unique.
7. Check commas and quotation marks.

============================================================
29. SIMPLE RULE TO REMEMBER
============================================================

ID = UNIQUE IDENTITY OF THE QUIZ

type = CATEGORY

title = NAME SHOWN TO STUDENT

startAt = WHEN IT OPENS

endAt = WHEN IT CLOSES

durationMinutes = TIME GIVEN TO A STUDENT AFTER STARTING

questions = QUESTIONS INSIDE THAT QUIZ

Therefore:

    id: "weekly-demo-001"
    type: "weekly"

means:

    Quiz ID = weekly-demo-001
    Category = Weekly

And:

    id: "weekly-demo-002"
    type: "weekly"

means:

    Quiz ID = weekly-demo-002
    Category = Weekly

Both can exist at the same time.

============================================================
END OF GUIDE
============================================================
