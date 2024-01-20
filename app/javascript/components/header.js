window.addEventListener("scroll", function (e) {
  const el = document.getElementById("header-background");
  console.log(e, el);
  if (!el) return;
  el.style.opacity = Math.min(window.scrollY / 88, 1);
});
