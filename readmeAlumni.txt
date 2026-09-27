BCC ALUMNI PAGE
================

HOW TO ADD OR EDIT AN ALUMNI STORY
===================================

The alumni stories are managed inside:

    alumni.js

You do NOT need to edit alumni.html to add the actual story text.

Each alumni card in alumni.html has a Read Story button with a
data-story-id. That ID connects the card to the matching story
inside alumni.js.


1. FIND THE STORIES SECTION
===========================

Open:

    alumni.js

Find this section:

    const stories = {

Inside it, you will see entries such as:

    ca: {
      title: "CA Alumni Story",
      icon: "fa-file-invoice-dollar",
      paragraphs: [
        "PASTE THE REAL CA ALUMNI STORY HERE.",
        "Add the student's BCC journey, preparation, achievements, challenges and message for current students."
      ],
      highlight: "PASTE THE CA ALUMNI'S PERSONAL MESSAGE HERE."
    },

There are currently story entries for:

    ca
    iit
    neet
    amu
    jmi
    civil
    law
    founder


2. HOW THE STORY ID WORKS
=========================

The story ID is taken from the button in alumni.html.

Example:

    <button class="story-btn"
            data-story-id="iit"
            data-title="IIT Alumni Story">

The important part is:

    data-story-id="iit"

Therefore, alumni.js must contain:

    iit: {

If the IDs do not match, the correct story will not be displayed.


3. HOW TO ADD AN IIT ALUMNI STORY
=================================

Find this entry in alumni.js:

    iit: {
      title: "IIT Alumni Story",
      icon: "fa-laptop-code",
      paragraphs: [
        "YOUR FIRST PARAGRAPH",
        "YOUR SECOND PARAGRAPH"
      ],
      highlight: "YOUR PERSONAL MESSAGE"
    },

Replace only the text inside the quotation marks.

Example:

    iit: {
      title: "IIT Alumni Story",
      icon: "fa-laptop-code",
      paragraphs: [
        "My journey from BCC to IIT Madras taught me the importance of consistency, discipline and continuous learning.",
        "The guidance and support I received at BCC helped me build confidence and stay focused on my academic goals."
      ],
      highlight: "Marks are only one part of the journey. Keep learning, stay consistent and trust the process."
    },


4. WHAT ARE 'paragraphs'?
=========================

The paragraphs section contains the main story.

Example:

    paragraphs: [
      "This is the first paragraph.",
      "This is the second paragraph.",
      "This is the third paragraph."
    ]

Each quoted line becomes a separate paragraph in the Alumni Story
popup.

You can have:

    1 paragraph
    2 paragraphs
    3 paragraphs
    or more

There is no need to change the JavaScript function that displays them.


5. WHAT IS 'highlight'?
=======================

The highlight is the short personal message shown in the highlighted
box at the bottom of the story.

Example:

    highlight: "Stay consistent, respect your teachers and keep working toward your goals."

Use this for a short:

    - Message to current BCC students
    - Advice
    - Personal lesson
    - Motivational statement

If you do not want a highlight message, you can use:

    highlight: ""

Do not delete the comma after the paragraphs section if another
property follows it.


6. HOW TO ADD A COMPLETELY NEW ALUMNI
=====================================

If you create a new alumni card, first give its Read Story button
a unique ID.

Example in alumni.html:

    data-story-id="newalumni"

Then add the matching entry inside the stories object in alumni.js:

    newalumni: {
      title: "New Alumni Story",
      icon: "fa-user-graduate",
      paragraphs: [
        "First paragraph of the alumni story.",
        "Second paragraph of the alumni story."
      ],
      highlight: "Advice or personal message from the alumni."
    },

IMPORTANT:

The ID must be exactly the same in both places.

HTML:

    data-story-id="newalumni"

JavaScript:

    newalumni: {


7. DO NOT CHANGE THESE FUNCTIONS
================================

Normally, you only need to edit the content inside:

    const stories = {

Do NOT modify these functions unless you know JavaScript:

    renderStory()
    openStory()
    closeModal()

These functions automatically:

    - find the selected alumni
    - load the correct story
    - display the title
    - display the icon
    - display all paragraphs
    - display the highlight message
    - open and close the popup


8. CURRENT ALUMNI STORY IDs
===========================

The current IDs are:

    ca       = CA Alumni
    iit      = IIT Alumni
    neet     = NEET Alumni
    amu      = AMU Alumni
    jmi      = JMI Alumni
    civil    = Civil Services Alumni
    law      = Law Alumni
    founder  = Entrepreneur / Founder Alumni

For example, to edit the CA story, edit:

    ca: {

To edit the IIT story, edit:

    iit: {


9. WHERE THE STORY APPEARS
===========================

When a user clicks:

    Read Story

the JavaScript reads the matching data-story-id and opens the story
modal.

The modal automatically displays:

    - Alumni Story title
    - Icon
    - Main story paragraphs
    - Highlight / personal message


10. IMPORTANT FILES
===================

alumni.html
-----------
Contains the alumni cards and the Read Story buttons.

alumni.css
----------
Controls the design, layout, colours and story popup styling.

alumni.js
---------
Contains the actual alumni story content and the JavaScript required
to open and display each story.

You normally only need to edit:

    alumni.js


11. AFTER EDITING
=================

After saving alumni.js:

1. Save the file.
2. Refresh the Alumni page in the browser.
3. Click the relevant "Read Story" button.
4. Check that the complete story appears correctly.

If the old version still appears, do a hard refresh of the browser.


12. SIMPLE RULE TO REMEMBER
===========================

CARD BUTTON:

    data-story-id="iit"

MATCHES:

    iit: {

Then put the story inside:

    paragraphs: [
      "Story paragraph 1",
      "Story paragraph 2"
    ]

And the short message inside:

    highlight: "Personal message"


THAT'S IT.

You do not need to change the HTML or CSS just to add or edit the
text of an existing alumni story.
