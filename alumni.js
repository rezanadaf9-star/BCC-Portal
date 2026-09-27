/* =========================================================
   BCC ALUMNI - COMPLETE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const sidebar = document.getElementById("siteSidebar");
  const menuToggle = document.getElementById("menuToggle");

  const modal = document.getElementById("storyModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalIcon = document.getElementById("modalIcon");
  const modalStoryContent = document.getElementById("modalStoryContent");

  const year = document.querySelector(".current-year");
  if (year) year.textContent = new Date().getFullYear();

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  /* ================= MOBILE SIDEBAR ================= */

  function closeSidebar() {
    if (!sidebar || !menuToggle) return;

    sidebar.classList.remove("mobile-open");
    body.classList.remove("sidebar-open");

    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  function openSidebar() {
    if (!sidebar || !menuToggle) return;

    sidebar.classList.add("mobile-open");
    body.classList.add("sidebar-open");

    menuToggle.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (!isMobile()) return;

      if (sidebar.classList.contains("mobile-open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  /* Close sidebar after choosing a menu item. */
  if (sidebar) {
    sidebar.querySelectorAll("li").forEach(item => {
      item.addEventListener("click", () => {
        if (isMobile()) closeSidebar();
      });
    });
  }

  /* Click outside sidebar = close sidebar. */
  document.addEventListener("click", event => {
    if (
      isMobile() &&
      sidebar &&
      sidebar.classList.contains("mobile-open") &&
      !sidebar.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeSidebar();
    }
  });

  /* ================= ALUMNI STORIES =================

     EDIT STORIES HERE.

     Every Read Story button has a data-story-id in alumni.html.
     Example:
       data-story-id="ca"

     That ID must match one of the keys below.

     You can write as many paragraphs as you want.
  */

  const stories = {
    ca: {
      title: "CA Alumni Story",
      icon: "fa-file-invoice-dollar",
      paragraphs: [
        "PASTE THE REAL CA ALUMNI STORY HERE.",
        "Add the student's BCC journey, preparation, achievements, challenges and message for current students."
      ],
      highlight: "PASTE THE CA ALUMNI'S PERSONAL MESSAGE HERE."
    },

    iit: {
      title: "IIT Alumni Story",
      icon: "fa-laptop-code",
      paragraphs: [
        "Ek simple academic background se IIT Madras tak ka safar mere liye dedication, Persistence  aur continuous learning ka journey raha hai. Challenges aur setbacks ke bawajood maine apne goal par focus banaye rakha, aur aaj IIT Madras ka student hokar apne dreams ko reality ki taraf le ja raha hoon.",
        "BCC mere academic journey ka ek important turning point raha. Yahan mujhe academics ke saath confidence, discipline aur right mentorship mila. Rehan Sir, Zaki Sir aur Muntazir Sir ki constant guidance aur encouragement ne mujhe apne potential ko recognise karne aur ambitious goals pursue karne ke liye inspire kiya."

      ],
      highlight: "Main maanta hoon ki marks aapki journey ka sirf ek part hain. Knowledge, dedication aur consistency hi long-term success ki foundation hain. Apne teachers follow karein aur mehnat karte rahein."
    },

    neet: {
      title: "NEET Alumni Story",
      icon: "fa-stethoscope",
      paragraphs: [
        "PASTE THE REAL NEET ALUMNI STORY HERE.",
        "Add the student's BCC journey, preparation, achievement and experience."
      ],
      highlight: "PASTE THE NEET ALUMNI'S PERSONAL MESSAGE HERE."
    },

    amu: {
      title: "AMU Alumni Story",
      icon: "fa-users-rectangle",
      paragraphs: [
        "PASTE THE REAL AMU ALUMNI STORY HERE.",
        "Add the student's BCC journey, admission path and achievements."
      ],
      highlight: "PASTE THE AMU ALUMNI'S PERSONAL MESSAGE HERE."
    },

    jmi: {
      title: "JMI Alumni Story",
      icon: "fa-star",
      paragraphs: [
        "PASTE THE REAL JMI ALUMNI STORY HERE.",
        "Add the student's BCC journey, preparation and university experience."
      ],
      highlight: "PASTE THE JMI ALUMNI'S PERSONAL MESSAGE HERE."
    },

    civil: {
      title: "Civil Services Alumni Story",
      icon: "fa-building-columns",
      paragraphs: [
        "PASTE THE REAL CIVIL SERVICES ALUMNI STORY HERE.",
        "Add the student's academic journey, preparation, milestones and achievements."
      ],
      highlight: "PASTE THE CIVIL SERVICES ALUMNI'S PERSONAL MESSAGE HERE."
    },

    law: {
      title: "Law Alumni Story",
      icon: "fa-scale-balanced",
      paragraphs: [
        "PASTE THE REAL LAW ALUMNI STORY HERE.",
        "Add the student's BCC journey, entrance preparation, degree and achievements."
      ],
      highlight: "PASTE THE LAW ALUMNI'S PERSONAL MESSAGE HERE."
    },

    founder: {
      title: "Entrepreneur Alumni Story",
      icon: "fa-rocket",
      paragraphs: [
        "PASTE THE REAL ENTREPRENEUR ALUMNI STORY HERE.",
        "Add the student's education, journey, milestones and entrepreneurial experience."
      ],
      highlight: "PASTE THE FOUNDER'S PERSONAL MESSAGE HERE."
    }
  };

  function renderStory(story) {
    if (!modalStoryContent) return;

    modalStoryContent.innerHTML = "";

    if (!story) {
      const p = document.createElement("p");
      p.textContent = "This alumni story has not been added yet.";
      modalStoryContent.appendChild(p);
      return;
    }

    story.paragraphs.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      modalStoryContent.appendChild(p);
    });

    if (story.highlight) {
      const highlight = document.createElement("div");
      highlight.className = "story-highlight";
      highlight.textContent = story.highlight;
      modalStoryContent.appendChild(highlight);
    }
  }

  function openStory(button) {
    if (!modal) return;

    const id = button.dataset.storyId;
    const story = stories[id];

    if (modalTitle) {
      modalTitle.textContent =
        story?.title || button.dataset.title || "Alumni Story";
    }

    if (modalIcon) {
      modalIcon.className =
        `fa-solid ${story?.icon || "fa-user-graduate"}`;
    }

    renderStory(story);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");

    modal._lastTrigger = button;

    const closeButton = modal.querySelector(".modal-close");
    if (closeButton) closeButton.focus();
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");

    if (modal._lastTrigger) {
      modal._lastTrigger.focus();
      modal._lastTrigger = null;
    }
  }

  document.querySelectorAll(".story-btn").forEach(button => {
    button.addEventListener("click", () => openStory(button));
  });

  document.querySelectorAll("[data-close-modal]").forEach(element => {
    element.addEventListener("click", closeModal);
  });

  /* ================= ESC KEY ================= */

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    if (modal?.classList.contains("open")) {
      closeModal();
      return;
    }

    if (isMobile() && sidebar?.classList.contains("mobile-open")) {
      closeSidebar();
    }
  });

  /* ================= EXISTING HEADER ACTIONS ================= */

  const profile = document.querySelector(".profile-mini");
  if (profile) {
    profile.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }

  const notifications = document.querySelector(".notification-btn");
  if (notifications) {
    notifications.addEventListener("click", () => {
      window.location.href = "notices.html";
    });
  }

  /* ================= CARD SETUP ================= */

  document.querySelectorAll(".alumni-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 45}ms`;
    card.classList.add("ready");
  });

  /* ================= IMAGE FALLBACK ================= */

  document.querySelectorAll(".photo-wrap img").forEach(img => {
    img.addEventListener("error", () => {
      img.classList.add("image-missing");
      img.style.opacity = "0";
      img.parentElement?.classList.add("placeholder-photo");
    });
  });

  /* If resized from mobile to desktop, reset the drawer. */
  window.addEventListener("resize", () => {
    if (!isMobile()) closeSidebar();
  });

  body.classList.add("alumni-page-loaded");
});
