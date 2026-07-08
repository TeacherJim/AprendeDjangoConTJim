/**
 * Theme management — light/dark with localStorage and system preference
 */
(function () {
  "use strict";

  const STORAGE_KEY = "tj-theme";
  const html = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    updateToggleLabel(theme);
  }

  function updateToggleLabel(theme) {
    const toggles = document.querySelectorAll("[data-theme-toggle]");
    toggles.forEach(function (btn) {
      const isDark = theme === "dark";
      btn.setAttribute("aria-label", isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
      const sun = btn.querySelector(".icon-sun");
      const moon = btn.querySelector(".icon-moon");
      if (sun) sun.hidden = isDark;
      if (moon) moon.hidden = !isDark;
    });
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const theme = saved || getSystemTheme();
    applyTheme(theme);

    if (!saved) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    }
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", toggleTheme);
    });
  });

  /* Prevent flash — run immediately */
  (function () {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  })();
})();
