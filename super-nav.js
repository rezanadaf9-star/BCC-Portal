/* =========================================================
   SUPER 15 SIDEBAR SUBSECTIONS
   ========================================================= */

const super15MenuToggle = document.getElementById("super15MenuToggle");
const super15Submenu = document.getElementById("super15Submenu");

super15MenuToggle.addEventListener("click", event => {
    event.preventDefault();
    super15Submenu.classList.toggle("hidden");
});
