"use client";

import { useEffect } from "react";

export default function ScrollToHash() {
  useEffect(() => {
    // Check if there's a hash in the URL on mount
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return null;
}
