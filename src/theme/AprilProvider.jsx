import { useLayoutEffect } from "react";

/**
 * Sets `data-theme` on `<html>`, which April tokens use for light and dark.
 */
export function AprilProvider({ theme = "light", children }) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("data-theme");
    root.setAttribute("data-theme", theme);
    return () => {
      if (previous == null) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", previous);
    };
  }, [theme]);

  return children;
}
