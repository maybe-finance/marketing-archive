function setupHomepagePreview() {
  const wrapper = document.getElementById("preview-wrapper");

  wrapper.addEventListener("pointermove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    wrapper.style.setProperty("--mx", (e.clientX - rect.x) / rect.width);
    wrapper.style.setProperty("--my", (e.clientY - rect.y) / rect.height);
  });
}

// Copied from homepage-bubble.js
if (document.readyState != "loading") {
  setTimeout(() => setupHomepagePreview(), 100);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => setupHomepagePreview(), 100);
  });
}
