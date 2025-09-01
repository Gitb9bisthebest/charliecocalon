// js/main.js - Updated version
import {
  footerContent,
  navigationContent,
  initFooterEffects,
} from "./components.js";
import { setActiveNavigation, initNavigationHandlers } from "./navigation.js";

// Inject navigation
function injectNavigation() {
  let navContainer = document.getElementById("nav-container");

  if (!navContainer) {
    navContainer = document.createElement("div");
    navContainer.id = "nav-container";
    // Insert at the very beginning of body
    document.body.insertBefore(navContainer, document.body.firstChild);
  }

  navContainer.innerHTML = navigationContent;

  // Set active navigation after injection
  setTimeout(() => {
    setActiveNavigation();
    initNavigationHandlers();
  }, 50);
}

// Inject footer
function injectFooter() {
  const isContactPage = document.querySelector(".page.contact-page");
  if (isContactPage) {
    return;
  }
  // Create or use existing footer container
  let footerContainer = document.getElementById("footer-container");

  if (!footerContainer) {
    footerContainer = document.createElement("div");
    footerContainer.id = "footer-container";
    document.body.appendChild(footerContainer);
  }

  footerContainer.innerHTML = footerContent;

  // Initialize footer effects after injection
  initFooterEffects(updateLiveDateTime);
}

// Update live date and time
function updateLiveDateTime() {
  console.log("🕒 Starting date/time update...");
  // Get BOTH elements - footer AND nav
  const dateElements = document.querySelectorAll(
    ".copyright-info .mn, .nav-footer-item-copy .mn"
  );

  if (dateElements.length === 0) return;

  const update = () => {
    const now = new Date();
    const isMobile = window.innerWidth <= 1000;

    let timeText, dateText, finalText;

    if (isMobile) {
      // Mobile compact format
      timeText = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      dateText = now
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "/");

      finalText = `MWT — ${timeText} / ${dateText} / Web Dev`;
    } else {
      // Desktop with AM/PM
      timeText = now.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      dateText = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      finalText = `MWT — ${timeText} / ${dateText} / Web Dev`;
    }

    // Update ALL matching elements
    dateElements.forEach((element) => {
      if (element.textContent.includes("MWT —")) {
        element.textContent = finalText;
      }
    });
  };

  // Initial update
  update();

  // Update every second
  const intervalId = setInterval(update, 1000);

  // Also update on window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(update, 250);
  });

  return () => {
    clearInterval(intervalId);
    window.removeEventListener("resize", update);
  };
}

// Inject navigation and footer
function injectAll() {
  console.log("🔄 Injecting navigation and footer dynamically...");

  injectNavigation();
  injectFooter();
  setTimeout(updateLiveDateTime, 100);
}

// Handle injection
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectAll);
} else {
  injectAll();
}

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  setTimeout(setActiveNavigation, 50);
});

// Handle page visibility change (when user returns to tab)
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    setTimeout(setActiveNavigation, 50);
  }
});
