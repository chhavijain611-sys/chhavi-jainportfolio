/**
 * Chhavi Jain - Personal Portfolio Scripts
 * Handles mobile navigation, active section tracking, smooth interactions,
 * placeholder alerts, and contact form validation.
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selectors ---
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const toast = document.getElementById("toast");
  const resumeButtons = document.querySelectorAll(".resume-btn");
  const placeholderLinks = document.querySelectorAll(".placeholder-link");
  const placeholderButtons = document.querySelectorAll(".placeholder-btn");
  const contactForm = document.getElementById("contactForm");
  const currentYearSpan = document.getElementById("currentYear");

  // Update current year dynamically in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Toast Notification Handler ---
  let toastTimer = null;
  function showToast(message, duration = 4000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }

  // --- Mobile Navigation Toggle ---
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        navMenu.classList.add("open");
        navToggle.classList.add("open");
        navToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close mobile menu if clicked outside
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Header Scrolled State ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Active Nav Link Highlight on Scroll ---
  const sections = document.querySelectorAll("section[id]");

  function handleActiveNav() {
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 70;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 80;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", handleActiveNav);

  // --- Resume Download Placeholder Action ---
  resumeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(
        "📄 Resume Placeholder: Chhavi Jain's official PDF resume will be available here soon."
      );
    });
  });

  // --- Social Profile Placeholders ---
  placeholderLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const platform = link.getAttribute("data-platform") || "Profile";
      showToast(`🔗 ${platform} Placeholder: Ready to link your ${platform} profile URL.`);
    });
  });

  // --- Project Action Buttons Placeholders ---
  placeholderButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const actionName = btn.getAttribute("data-action") || "Details";
      showToast(`💡 ${actionName}: Concept documentation and updates will be shared as the project develops.`);
    });
  });

  // --- Contact Form Client-side Validation & Feedback ---
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add("error");
        nameError.classList.add("visible");
        isValid = false;
      } else {
        nameInput.classList.remove("error");
        nameError.classList.remove("visible");
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.classList.add("error");
        emailError.classList.add("visible");
        isValid = false;
      } else {
        emailInput.classList.remove("error");
        emailError.classList.remove("visible");
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add("error");
        subjectError.classList.add("visible");
        isValid = false;
      } else {
        subjectInput.classList.remove("error");
        subjectError.classList.remove("visible");
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add("error");
        messageError.classList.add("visible");
        isValid = false;
      } else {
        messageInput.classList.remove("error");
        messageError.classList.remove("visible");
      }

      if (isValid) {
        const senderName = nameInput.value.trim();
        showToast(`✉️ Thank you, ${senderName}! Your message note has been captured.`);
        contactForm.reset();
      }
    });

    // Clear error states on input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      input.addEventListener("input", () => {
        input.classList.remove("error");
        const errSpan = document.getElementById(`${input.id}Error`);
        if (errSpan) errSpan.classList.remove("visible");
      });
    });
  }
});
