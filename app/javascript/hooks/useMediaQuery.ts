import { useState, useEffect } from "react";

export const screenMediaQueries = {
  xs: "(min-width: 375px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

export default (screenOrMediaQuery: string): boolean => {
  const isScreen = (
    screenOrMediaQuery: string
  ): screenOrMediaQuery is keyof typeof screenMediaQueries =>
    screenOrMediaQuery in screenMediaQueries;
  const mediaQuery = isScreen(screenOrMediaQuery)
    ? screenMediaQueries[screenOrMediaQuery]
    : screenOrMediaQuery;
  const [matches, setMatches] = useState(window.matchMedia(mediaQuery).matches);

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener
      ? media.addEventListener("change", listener)
      : media.addListener(listener);
    return () =>
      media.removeEventListener
        ? media.removeEventListener("change", listener)
        : media.removeListener(listener);
  }, [mediaQuery]);

  return matches;
};
