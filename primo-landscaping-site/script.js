const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.querySelectorAll(".service-panel").forEach((panel) => {
  panel.addEventListener("toggle", () => {
    if (!panel.open) {
      return;
    }

    document.querySelectorAll(".service-panel").forEach((otherPanel) => {
      if (otherPanel !== panel) {
        otherPanel.open = false;
      }
    });
  });
});
