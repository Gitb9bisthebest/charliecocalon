// js/navigation.js - New file to handle navigation active states

export function setActiveNavigation() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll(".nav-item");

  if (!navItems.length) {
    console.warn("Navigation items not found");
    return;
  }

  // Remove active class from all nav items
  navItems.forEach((item) => {
    item.classList.remove("active");
  });

  // Add active class based on current path
  navItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      const href = link.getAttribute("href");

      // Handle exact matches and root path
      if (
        href === currentPath ||
        (currentPath === "/" && href === "/") ||
        (currentPath !== "/" && href !== "/" && currentPath.includes(href))
      ) {
        item.classList.add("active");
      }
    }
  });
}

// Optional: Handle navigation clicks for SPA-like behavior
export function initNavigationHandlers() {
  document.addEventListener("click", (e) => {
    const navLink = e.target.closest(".nav-item a");
    if (!navLink) return;

    // If you want immediate visual feedback on click (optional)
    // Uncomment the lines below for instant active state change
    /*
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    navLink.closest('.nav-item').classList.add('active');
    */
  });
}
