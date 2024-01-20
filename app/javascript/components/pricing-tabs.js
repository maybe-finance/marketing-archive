function setupPricingTabs() {
  const monthlyTab = document.getElementById("pricing-tab-monthly");
  const yearlyTab = document.getElementById("pricing-tab-yearly");

  if (!monthlyTab || !yearlyTab) return;

  monthlyTab.addEventListener("change", (e) => {
    if (e.target.checked) {
      document
        .querySelectorAll(".pricing-monthly")
        .forEach((el) => (el.style.display = "block"));
      document
        .querySelectorAll(".pricing-yearly")
        .forEach((el) => (el.style.display = "none"));
    }
  });

  yearlyTab.addEventListener("change", (e) => {
    if (e.target.checked) {
      document
        .querySelectorAll(".pricing-yearly")
        .forEach((el) => (el.style.display = "block"));
      document
        .querySelectorAll(".pricing-monthly")
        .forEach((el) => (el.style.display = "none"));
    }
  });
}

// Copied from homepage-bubble.js
if (document.readyState != "loading") {
  setTimeout(() => setupPricingTabs(), 100);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => setupPricingTabs(), 100);
  });
}
