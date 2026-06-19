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

const servicePanels = document.querySelectorAll(".service-panel");

function openServicePanel(panel) {
  const body = panel.querySelector(".service-panel-body");
  panel.open = true;
  if (!body) {
    return;
  }

  body.style.maxHeight = "0px";
  body.style.opacity = "0";
  body.style.paddingBottom = "0px";
  requestAnimationFrame(() => {
    body.style.paddingBottom = window.matchMedia("(max-width: 900px)").matches ? "20px" : "24px";
    body.style.maxHeight = `${body.scrollHeight}px`;
    body.style.opacity = "1";
  });
}

function closeServicePanel(panel) {
  const body = panel.querySelector(".service-panel-body");
  if (!body) {
    panel.open = false;
    return;
  }

  body.style.maxHeight = `${body.scrollHeight}px`;
  body.style.opacity = "1";
  body.style.paddingBottom = window.matchMedia("(max-width: 900px)").matches ? "20px" : "24px";
  requestAnimationFrame(() => {
    body.style.maxHeight = "0px";
    body.style.opacity = "0";
    body.style.paddingBottom = "0px";
  });

  body.addEventListener(
    "transitionend",
    () => {
      if (body.style.maxHeight === "0px") {
        panel.open = false;
      }
    },
    { once: true }
  );
}

servicePanels.forEach((panel) => {
  const summary = panel.querySelector("summary");
  const body = panel.querySelector(".service-panel-body");
  if (panel.open && body) {
    body.style.maxHeight = `${body.scrollHeight}px`;
    body.style.opacity = "1";
    body.style.paddingBottom = window.matchMedia("(max-width: 900px)").matches ? "20px" : "24px";
  }

  summary?.addEventListener("click", (event) => {
    event.preventDefault();

    if (panel.open) {
      closeServicePanel(panel);
      return;
    }

    const openPanel = Array.from(servicePanels).find((otherPanel) => otherPanel !== panel && otherPanel.open);
    if (openPanel) {
      closeServicePanel(openPanel);
      window.setTimeout(() => openServicePanel(panel), 130);
    } else {
      openServicePanel(panel);
    }
  });
});
