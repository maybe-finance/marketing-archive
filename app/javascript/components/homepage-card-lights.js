function setupHomepageCardLights() {
  const elements = document.querySelectorAll(".card-light");

  document.addEventListener("pointermove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty(
        "--mx",
        mouseX - (rect.x + rect.width / 2) + "px"
      );
      element.style.setProperty(
        "--my",
        mouseY - (rect.y + rect.height / 2) + "px"
      );
    });
  });
}

// Copied from homepage-bubble.js
if (document.readyState != "loading") {
  setTimeout(() => setupHomepageCardLights(), 100);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => setupHomepageCardLights(), 100);
  });
}
