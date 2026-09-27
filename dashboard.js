// ===============================
// Active Sidebar Menu
// ===============================

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

    });

});

// ===============================
// Notification
// ===============================

const notification = document.querySelector(".notification");

if (notification) {
    notification.addEventListener("click", () => {
        alert("You have 3 new notifications!");
    });
}

// ===============================
// Profile Dropdown
// ===============================

const profile = document.querySelector(".profile");

if (profile) {
    profile.addEventListener("click", () => {
        window.location.href = "profile.html";
    });
}

// ===============================
// Card Hover Animation
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

    card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

    card.style.transform="translateY(0px)";

});

});

// ===============================
// Live Date
// ===============================

const today = new Date();

const options = {

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

};

console.log(today.toLocaleDateString("en-IN",options));

// ===============================
// Greeting
// ===============================

const hour = new Date().getHours();

let greeting="Good Morning";

if(hour>=12 && hour<17){

greeting="Good Afternoon";

}

else if(hour>=17){

greeting="Good Evening";

}

const heading=document.querySelector("header h1");

if(heading){

heading.innerHTML=greeting+", Meezan Alam 👋";

}

// ===============================
// Button Animation
// ===============================

const buttons=document.querySelectorAll("button");

buttons.forEach(btn=>{

btn.addEventListener("mousedown",()=>{

btn.style.transform="scale(.95)";

});

btn.addEventListener("mouseup",()=>{

btn.style.transform="scale(1)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// ===============================
// Table Row Highlight
// ===============================

const rows=document.querySelectorAll("table tr");

rows.forEach((row,index)=>{

if(index===0) return;

row.addEventListener("mouseenter",()=>{

row.style.background="#edf3ff";

});

row.addEventListener("mouseleave",()=>{

row.style.background="white";

});

});

// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll("a").forEach(anchor=>{

anchor.addEventListener("click",function(e){

const href=this.getAttribute("href");

if(href && href.startsWith("#")){

e.preventDefault();

document.querySelector(href).scrollIntoView({

behavior:"smooth"

});

}

});

});

// ===============================
// Console Message
// ===============================

console.log("Student Dashboard Loaded Successfully!");


// ============================================================
// MOBILE / TABLET SIDEBAR
// ============================================================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {
    if (!sidebar || !menuToggle) return;

    sidebar.classList.add("open");
    document.body.classList.add("sidebar-open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    const icon = menuToggle.querySelector("i");
    if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    }
}

function closeSidebar() {
    if (!sidebar || !menuToggle) return;

    sidebar.classList.remove("open");
    document.body.classList.remove("sidebar-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    const icon = menuToggle.querySelector("i");
    if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
}

// Close the drawer after choosing a navigation item.
// The existing inline navigation remains unchanged.
if (sidebar) {
    sidebar.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 1050) {
                closeSidebar();
            }
        });
    });
}

// Escape closes the sidebar.
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && sidebar && sidebar.classList.contains("open")) {
        closeSidebar();
    }
});

// If the screen is resized back to desktop, reset the mobile state.
window.addEventListener("resize", () => {
    if (window.innerWidth > 1050) {
        closeSidebar();
    }
});


/* ============================================================
   HEADER / SIDEBAR RESPONSIVE SAFETY
   The header is made sticky by style.css. JavaScript only
   controls the off-canvas sidebar and never fixes the
   hamburger to the viewport.
   ============================================================ */

function syncMobileNavigation() {
    if (!sidebar || !menuToggle) return;

    if (window.innerWidth > 1050) {
        closeSidebar();
    }
}

window.addEventListener("resize", syncMobileNavigation);
window.addEventListener("orientationchange", syncMobileNavigation);


/* =========================================================
   TOUCH FLOATING MENU
   First tap  = open menu
   Second tap = follow Learn link
   Connect    = follows its own link
   Only active <= 768px
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const floatingMenu =
        document.querySelector(".floating-learning-menu");

    const learnButton =
        document.querySelector(".floating-learn");

    const aiButton =
        document.querySelector(".floating-ai");

    if (!floatingMenu || !learnButton || !aiButton) {
        return;
    }

    function isMobile() {
        return window.matchMedia("(max-width: 768px)").matches;
    }

    /* -----------------------------------------
       LEARN BUTTON
       ----------------------------------------- */

    learnButton.addEventListener("click", function (event) {

        if (!isMobile()) {
            return;
        }

        /*
         * First tap:
         * Open the floating menu instead of
         * immediately going to learning.html.
         */
        if (!floatingMenu.classList.contains("mobile-open")) {

            event.preventDefault();

            floatingMenu.classList.add("mobile-open");

            return;
        }

        /*
         * Second tap:
         * Do NOT prevent default.
         * The original href="learning.html"
         * will work normally.
         */

    });


    /* -----------------------------------------
       CONNECT / AI BUTTON
       ----------------------------------------- */

    aiButton.addEventListener("click", function (event) {

        if (!isMobile()) {
            return;
        }

        /*
         * If somehow tapped while closed,
         * open the menu first.
         */
        if (!floatingMenu.classList.contains("mobile-open")) {

            event.preventDefault();

            floatingMenu.classList.add("mobile-open");

            return;
        }

        /*
         * Menu is already open:
         * allow original href="ptm.html"
         * to work normally.
         */

    });


    /* -----------------------------------------
       TAP OUTSIDE = CLOSE
       ----------------------------------------- */

    document.addEventListener("click", function (event) {

        if (!isMobile()) {
            return;
        }

        if (
            floatingMenu.classList.contains("mobile-open") &&
            !floatingMenu.contains(event.target)
        ) {
            floatingMenu.classList.remove("mobile-open");
        }

    });


    /* -----------------------------------------
       ESC = CLOSE
       ----------------------------------------- */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            floatingMenu.classList.remove("mobile-open");
        }

    });

});
