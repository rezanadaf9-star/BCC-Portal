/*
* NOTES MANIFEST
* --------------
* Browsers cannot silently scan an arbitrary local "Notes" folder.
* For a deployed website, use relative PDF URLs here or generate this
* manifest automatically from your backend/build process.
*
* Optional browser feature: notes.js also provides "Select Notes Folder"
* using the File System Access API when supported.
*/
window.NOTES_DATA = [
 {
    id: "math-quadratic-01",
    subject: "Maths",
    chapter: "Quadratic Equations",
    lecture: "Introduction to Quadratic Equations",
    date: "2026-09-23",
    pdf: "Notes/Maths/Quadratic Equations/Introduction.pdf",
    description: "Class notes and solved examples."
  },

  {
    id: "science-chemical-reaction-01",
    subject: "Science",
    chapter: "Chemical Reactions",
    lecture: "Chemical Reactions and Equations",
    date: "2026-09-20",
    pdf: "Notes/Science/chemical-reactions.pdf",
    description: "Class notes and solved examples."
  }
];
