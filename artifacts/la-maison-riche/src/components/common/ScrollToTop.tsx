import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop component
 * Listens to route changes across the application and smoothly/instantly resets
 * the scroll position to the top of the page so that arriving at any page or
 * navigating between products starts from the very beginning of the view.
 */
export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Immediate scroll reset on location change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [location]);

  return null;
}
