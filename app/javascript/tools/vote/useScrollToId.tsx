import { useEffect } from "react";

export default function useScrollToId(deps): void {
  const hash = window.location.hash;

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView();
    }
  }, [deps]);
}
