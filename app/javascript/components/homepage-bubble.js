import dynamicProperties from "dynamic-properties";

function setupHomepageBubble() {
  const component = document.querySelector(".js-homepage-bubble");

  if (!component) {
    return;
  }

  const dimensions = dynamicProperties({
    viewportWidth: () => component.getBoundingClientRect().width,
    viewportHeight: () => component.getBoundingClientRect().height,
  });

  const items = Array.from(component.children);

  // Hide everything
  items.forEach((item) => {
    Object.assign(item.style, {
      position: "absolute",
      top: "100%",
      transformOrigin: "50% 50%",
      opacity: 0,
      transition: "none",
    });
  });

  // Options
  const options = {
    delayBetweenItems: 400,
    maximumItemsInViewport: 12,
    durationBounds: [10000, 20000],
  };

  if (!("animate" in document.body)) {
    // Fallback
    const fallbackItems = items
      .map((item) => ({ item, sort: Math.random() }))
      .sort(({ sort: a }, { sort: b }) => a - b)
      .map(({ item }) => item)
      .slice(0, options.maximumItemsInViewport);

    const positions = [];

    const getRandomPosition = ({ width, height }) => {
      const x =
        width / 2 +
        Math.floor(Math.random() * (dimensions.viewportWidth - width));
      const y =
        height / 2 +
        Math.floor(Math.random() * (dimensions.viewportHeight - height));

      return {
        x,
        y,
        width,
        height,
      };
    };

    const hasOverlap = (position, positions) => {
      const overlapMargin = 20; // Making this too high can cause the whole thing to crash

      return positions.some(({ x, y, width, height }) => {
        const minX = x - width / 2 - overlapMargin;
        const maxX = x + width / 2 + overlapMargin;
        const minY = y - height / 2 - overlapMargin;
        const maxY = y + height / 2 + overlapMargin;

        // B's X is right of A's X
        if (position.x - position.width / 2 > maxX) {
          return false;
        }

        // B's X is left of A's X
        if (position.x + position.width / 2 < minX) {
          return false;
        }

        // B's X is right of A's X
        if (position.y - position.height / 2 > maxY) {
          return false;
        }

        // B's X is left of A's X
        if (position.y + position.height / 2 < minY) {
          return false;
        }

        return true;
      });
    };

    fallbackItems.forEach((item) => {
      const { width, height } = item.getBoundingClientRect();

      let position;
      let tries = 0; // Limit number of tries to avoid infinite loops :-)

      do {
        tries++;
        position = getRandomPosition({ width, height });
      } while (tries < 1000 && hasOverlap(position, positions));

      positions.push(position);

      const rotate = Math.round(-40 + Math.random() * 80) / 10;

      Object.assign(item.style, {
        top: `${-1 * (height / 2)}px`,
        left: `${-1 * (width / 2)}px`,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotate}deg)`,
        opacity: 1,
      });
    });

    // Fallback finished, quit here
    return;
  }

  // Prototype bubble
  let queue = [...items];
  let currentlyBubbling = 0;
  let pool = [];

  const launchBubble = () => {
    const [item] = queue.splice(Math.floor(Math.random() * queue.length), 1);

    // Place
    const { width, height } = item.getBoundingClientRect();
    const startX =
      width / 2 +
      Math.floor(Math.random() * (dimensions.viewportWidth - width));
    const startY = dimensions.viewportHeight - height / 2;
    const startRotate = Math.round(-40 + Math.random() * 80) / 10;

    const deltaX = Math.round(Math.random() * (2 * width) - width);
    const deltaRotate = Math.round(-300 + Math.random() * 600) / 10;

    const endX = startX + deltaX;
    const endY = -1 * Math.max(height, width / 2); // half width to account for rotation (it rotated 90deg,)
    const endRotate = startRotate + deltaRotate;

    const [minDuration, maxDuration] = options.durationBounds;
    const duration =
      minDuration + Math.floor(Math.random() * (maxDuration - minDuration));

    Object.assign(item.style, {
      top: `${-1 * (height / 2)}px`,
      left: `${-1 * (width / 2)}px`,
      transform: `translate(${startX}px, ${startY}px) rotate(${startRotate}deg)`,
      opacity: 0,
    });

    currentlyBubbling++;

    item
      .animate(
        [
          {
            transform: `translate(${startX}px, ${startY}px) rotate(${startRotate}deg) scale(0.825)`,
            opacity: 0,
          },
          { opacity: 0, offset: 0.025, easing: "linear" },
          { opacity: 1, offset: 0.15, easing: "linear" },
          { opacity: 1, offset: 0.75, easing: "linear" },
          {
            transform: `translate(${endX}px, ${endY}px) rotate(${endRotate}deg) scale(1.125)`,
            opacity: 0,
          },
        ],
        {
          duration,
          easing: "ease-in",
        }
      )
      .finished.then(() => {
        currentlyBubbling--;
        pool.push(item);
      });
  };

  const runtime = () => {
    if (queue.length === 0) {
      queue = pool;
      pool = [];
    }

    if (currentlyBubbling < options.maximumItemsInViewport) {
      launchBubble();
    }

    setTimeout(() => runtime(), options.delayBetweenItems);
  };

  runtime();
}

if (document.readyState != "loading") {
  setTimeout(() => setupHomepageBubble(), 100);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => setupHomepageBubble(), 100);
  });
}
