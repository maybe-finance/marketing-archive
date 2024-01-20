function setupHomepageDust() {
  const numParticles = 300;

  const wrapper = document.getElementById("dust-canvas-wrapper");
  const canvas = document.getElementById("dust-canvas");

  if (!wrapper || !canvas) return;

  canvas.width = wrapper.offsetWidth;
  canvas.height = wrapper.offsetHeight;

  const particles = new Float32Array(numParticles * 2);
  for (let i = 0; i < numParticles; ++i) {
    particles[i * 2 + 0] = Math.random() * canvas.offsetWidth;
    particles[i * 2 + 1] = Math.random() * canvas.offsetHeight;
  }

  function render(time) {
    const ctx = canvas?.getContext("2d");
    if (canvas == null || !ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < numParticles; ++i) {
      const layer = i % 3;
      particles[i * 2 + 0] += (Math.sin(time / 10000 + i) / 10) * (layer + 1);
      particles[i * 2 + 1] += (Math.cos(time / 10000 + i) / 10) * (layer + 1);

      const x = particles[i * 2 + 0];
      const y = particles[i * 2 + 1];

      ctx.fillStyle = ["#ffff", "#ffff", "#ffff"][layer];
      ctx.fillRect(x, y, 1, 1);
    }

    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
}

// Copied from homepage-bubble.js
if (document.readyState != "loading") {
  setTimeout(() => setupHomepageDust(), 100);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => setupHomepageDust(), 100);
  });
}
