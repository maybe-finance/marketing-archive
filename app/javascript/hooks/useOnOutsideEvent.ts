import React, { useEffect } from "react";

export default function useOnOutsideEvent(
  elementRef: React.RefObject<HTMLElement>,
  handler: (event: Event) => void
): void {
  useEffect(() => {
    const eventListener = (event: Event) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") {
          handler(event);
        }
      }

      if (event instanceof MouseEvent) {
        if (
          !elementRef.current ||
          elementRef.current.contains(event.target as Node)
        ) {
          return;
        }

        handler(event);
      }
    };
    document.addEventListener("mousedown", eventListener);
    document.addEventListener("keyup", eventListener);

    return () => {
      document.removeEventListener("mousedown", eventListener);
      document.removeEventListener("keyup", eventListener);
    };
  }, [elementRef, handler]);
}
