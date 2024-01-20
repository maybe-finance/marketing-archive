import { nanoid } from "nanoid";

const easeOutQuad = (x) => 1 - (1 - x) * (1 - x);
const easeInQuad = (x) => x * x * x * x;

const State = { Invisible: 0, Visible: 1, AnimatingIn: 2, AnimatingOut: 3 };

class BackgroundSwoop {
  constructor(el) {
    this.el = el;
    this.direction = el.dataset.direction === "rtl" ? "rtl" : "ltr";
    this.svg = el.querySelector("svg");
    this.id = `swoop-gradient-${nanoid()}`;

    this.currentAnimation = Promise.resolve();

    this.queue = null;
    this.state = State.Invisible;

    this.render();
    this.bind();
  }

  render() {
    const initialX1 = this.direction === "rtl" ? "99.99%" : "0%";
    const initialX2 = this.direction === "rtl" ? "100%" : "0%";
    this.svg.innerHTML += `<defs>
        <linearGradient id="${this.id}" x1="${initialX1}" x2="${initialX2}">
          <stop stop-opacity="${
            this.direction === "rtl" ? "0" : "1"
          }" stop-color="currentColor"/>
          <stop offset="1" stop-opacity="${
            this.direction === "rtl" ? "1" : "0"
          }" stop-color="currentColor"/>
        </linearGradient>
        </defs>`;

    this.svg.querySelector("path").setAttribute("stroke", `url(#${this.id})`);
  }

  bind() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]) {
          return;
        }

        const { intersectionRatio } = entries[0];

        if (
          this.state === State.Invisible ||
          this.state === State.AnimatingOut
        ) {
          // Invisible, but going over the treshold
          if (intersectionRatio >= 0.825) {
            this.queue = "in";
          }
        }

        if (this.state === State.Visible || this.state === State.AnimatingIn) {
          // Visible, but going below the treshold
          if (intersectionRatio <= 0.625) {
            this.queue = "out";
          }
        }

        this.currentAnimation.then(() => this.doQueuedAnimation());
      },
      { threshold: [0.625, 0.825] }
    );

    observer.observe(this.el);
  }

  doQueuedAnimation() {
    if (this.queue === "in") {
      this.currentAnimation = this.animateIn();
    } else if (this.queue === "out") {
      this.currentAnimation = this.animateOut();
    }

    this.queue = null;
  }

  animateIn() {
    return new Promise((resolve) => {
      this.state = State.AnimatingIn;

      const gradient = this.svg.querySelector(`#${this.id}`);

      const duration = 2000; // In milliseconds
      const durationInFrames = (duration / 1000) * 60; // requestAnimationFrame runs at 60 frames per second
      let frame = 0;

      const attribute = this.direction === "rtl" ? "x1" : "x2";

      const loop = () => {
        window.requestAnimationFrame(() => {
          const easedValue = easeOutQuad(frame / durationInFrames);

          const value =
            this.direction === "rtl"
              ? 99.99 - easedValue * 99.99
              : easedValue * 100;

          gradient.setAttribute(attribute, `${value}%`);

          frame++;

          if (frame < durationInFrames) {
            loop();
          } else {
            this.state = State.Visible;
            resolve();
          }
        });
      };

      loop();
    });
  }

  animateOut() {
    return new Promise((resolve) => {
      this.state = State.AnimatingOut;

      const gradient = this.svg.querySelector(`#${this.id}`);

      const duration = 2000; // In milliseconds
      const durationInFrames = (duration / 1000) * 60; // requestAnimationFrame runs at 60 frames per second
      let frame = 0;

      const attribute = this.direction === "rtl" ? "x1" : "x2";

      const loop = () => {
        window.requestAnimationFrame(() => {
          const easedValue = easeInQuad(frame / durationInFrames);

          const value =
            this.direction === "rtl"
              ? easedValue * 99.99
              : 100 - easedValue * 100;

          gradient.setAttribute(attribute, `${value}%`);

          frame++;

          if (frame < durationInFrames + 1) {
            loop();
          } else {
            this.state = State.Invisible;
            resolve();
          }
        });
      };

      loop();
    });
  }
}
const init = () => {
  const components = Array.from(
    document.querySelectorAll(".js-background-swoop")
  );
  components.forEach((component) => new BackgroundSwoop(component));
};

if (document.readyState != "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
}

window.initBackgroundSwoop = init;
