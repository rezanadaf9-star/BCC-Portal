/* =========================================================
   WELCOME PUBLIC SCHOOL
   LIQUID GLASS LOGIN
   ========================================================= */

/* =========================================================
   ELEMENTS
   ========================================================= */

const loginForm = document.getElementById("loginForm");

const loginButton = document.getElementById("loginButton");

const passwordInput = document.getElementById("password");

const passwordToggle = document.getElementById("passwordToggle");

const userIdInput = document.getElementById("userId");

const studentButton = document.getElementById("studentButton");

const teacherButton = document.getElementById("teacherButton");

const portalStatus = document.getElementById("portalStatus");

const portalName = document.getElementById("portalName");

const statusIcon = document.getElementById("statusIcon");

const idLabel = document.getElementById("idLabel");

const passwordLabel = document.getElementById("passwordLabel");

const idError = document.getElementById("idError");

const passwordError = document.getElementById("passwordError");

const loginMessage = document.getElementById("loginMessage");

const loginCard = document.querySelector(".login-card");

/* =========================================================
   PORTAL STATE
   ========================================================= */

let currentPortal = "student";

/* =========================================================
   PORTAL DATA
   ========================================================= */

const portalData = {
  student: {
    name: "Student Portal",

    idLabel: "Student ID",

    passwordLabel: "Password",

    idPlaceholder: "Enter Student ID",

    passwordPlaceholder: "Enter Student Password",
  },

  teacher: {
    name: "Teacher Portal",

    idLabel: "Teacher ID",

    passwordLabel: "Password",

    idPlaceholder: "Enter Teacher ID",

    passwordPlaceholder: "Enter Teacher Password",
  },
};

/* =========================================================
   SWITCH PORTAL
   ========================================================= */

function switchPortal(portal) {
  currentPortal = portal;

  const data = portalData[portal];

  /* -----------------------------------------
       Buttons
       ----------------------------------------- */

  studentButton.classList.remove("active");

  teacherButton.classList.remove("active");

  if (portal === "student") {
    studentButton.classList.add("active");

    loginCard.classList.remove("teacher-mode");
  } else {
    teacherButton.classList.add("active");

    loginCard.classList.add("teacher-mode");
  }

  /* -----------------------------------------
       Portal status
       ----------------------------------------- */

  portalName.textContent = data.name;

  /* -----------------------------------------
       Labels
       ----------------------------------------- */

  idLabel.textContent = data.idLabel;

  passwordLabel.textContent = data.passwordLabel;

  /* -----------------------------------------
       Placeholders
       ----------------------------------------- */

  userIdInput.placeholder = data.idPlaceholder;

  passwordInput.placeholder = data.passwordPlaceholder;

  /* -----------------------------------------
       Clear previous errors
       ----------------------------------------- */

  clearErrors();

  loginMessage.textContent = "";

  loginMessage.className = "login-message";

  /* -----------------------------------------
       Status animation
       ----------------------------------------- */

  portalStatus.style.transform = "scale(0.97)";

  setTimeout(() => {
    portalStatus.style.transform = "scale(1)";
  }, 120);
}

/* =========================================================
   STUDENT PORTAL
   ========================================================= */

studentButton.addEventListener("click", function () {
  switchPortal("student");
});

/* =========================================================
   TEACHER PORTAL
   ========================================================= */

teacherButton.addEventListener("click", function () {
  switchPortal("teacher");
});

/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

passwordToggle.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";

    this.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';

    this.setAttribute("aria-label", "Hide password");
  } else {
    passwordInput.type = "password";

    this.innerHTML = '<i class="fa-regular fa-eye"></i>';

    this.setAttribute("aria-label", "Show password");
  }
});

/* =========================================================
   VALIDATION
   ========================================================= */

function validateForm() {
  let valid = true;

  clearErrors();

  /* -----------------------------------------
       ID
       ----------------------------------------- */

  if (userIdInput.value.trim() === "") {
    idError.textContent = `Please enter your ${currentPortal} ID.`;

    userIdInput.classList.add("invalid");

    valid = false;
  }

  /* -----------------------------------------
       Password
       ----------------------------------------- */

  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Please enter your password.";

    passwordInput.classList.add("invalid");

    valid = false;
  }

  return valid;
}

/* =========================================================
   CLEAR ERRORS
   ========================================================= */

function clearErrors() {
  idError.textContent = "";

  passwordError.textContent = "";

  userIdInput.classList.remove("invalid");

  passwordInput.classList.remove("invalid");
}

/* This can be remove and replace the Login from here till before Clear Error While Typing okkk
replace this with this*/
/* =========================================================
   LOGIN & REDIRECT LOGIC
   ========================================================= */

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  loginMessage.textContent = "";

  loginMessage.className = "login-message";

  /* -------------------------------------
           Validate
           ------------------------------------- */

  if (!validateForm()) {
    return;
  }

  /* -------------------------------------
           Loading
           ------------------------------------- */

  loginButton.classList.add("loading");

  loginButton.disabled = true;

  /*
   * FRONT-END DEMO CREDENTIALS
   */

  setTimeout(function () {
    loginButton.classList.remove("loading");

    loginButton.disabled = false;

    // 1. Capture what the user typed
    const enteredId = userIdInput.value.trim();
    const enteredPassword = passwordInput.value;

    // 2. Define your target demo credentials
    const demoStudentId = "26BCC1001";
    const demoStudentPassword = "admin@bcc2009";

    // 3. Run validation check for student portal
    if (
      currentPortal === "student" &&
      enteredId === demoStudentId &&
      enteredPassword === demoStudentPassword
    ) {
      /*
       * Save the student session locally so protected frontend pages
       * such as Super 15 can know which student is logged in.
       *
       * Production authentication should be moved to the backend.
       */
      localStorage.setItem(
        "bccStudentSession",
        JSON.stringify({
          studentId: enteredId,
          name: enteredId,
          role: "student",
          loggedIn: true,
          loggedInAt: new Date().toISOString()
        })
      );

      loginMessage.textContent = "Login Successful! Redirecting...";
      loginMessage.classList.add("success");

      // Wait 800ms for the success message to be visible, then redirect
      setTimeout(function () {
        window.location.href = "dashboard.html";
      }, 800);
    } else if (currentPortal === "teacher") {
      loginMessage.textContent =
        "Teacher validation is not configured for this demo.";
      loginMessage.classList.add("error");
    } else {
      // Triggers if student credentials don't match your exact strings
      loginMessage.textContent = "Access Denied. Invalid Credentials.";
      loginMessage.classList.add("error");
    }
  }, 1000);
});

/* =========================================================
   CLEAR ERROR WHILE TYPING
   ========================================================= */

userIdInput.addEventListener("input", function () {
  this.classList.remove("invalid");

  idError.textContent = "";
});

passwordInput.addEventListener("input", function () {
  this.classList.remove("invalid");

  passwordError.textContent = "";
});

/* =========================================================
   ENTER KEY
   ========================================================= */

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && document.activeElement !== loginButton) {
    loginForm.requestSubmit();
  }
});

/* =========================================================
   INITIAL STATE
   ========================================================= */

switchPortal("student");
