/**
 * Main site interactions
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initBackToTop();
    initFooterYear();
    initContinueBanner();
    initOsTabs();
    initActiveNav();
  });

  function initMobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-mobile-nav]");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initBackToTop() {
    const btn = document.querySelector("[data-back-to-top]");
    if (!btn) return;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initFooterYear() {
    const el = document.querySelector("[data-current-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function initContinueBanner() {
    const banner = document.querySelector("[data-continue-banner]");
    if (!banner) return;

    try {
      const data = JSON.parse(localStorage.getItem("tj-progress") || "{}");
      let lastTutorial = null;
      let lastUrl = null;

      Object.keys(data).forEach(function (key) {
        const entry = data[key];
        if (entry.lastVisited && (!lastTutorial || entry.lastVisited > data[lastTutorial].lastVisited)) {
          lastTutorial = key;
        }
      });

      if (lastTutorial && data[lastTutorial]) {
        const entry = data[lastTutorial];
        if (!entry.completed) {
          const urls = {
            "tutorial-01": "tutoriales/01-instalar-vscode-python.html",
            "tutorial-02": "tutoriales/02-entornos-django.html",
            "tutorial-03": "tutoriales/03-primera-ventana-django.html",
            "tutorial-04": "tutoriales/04-todo-app-autenticacion.html",
            "tutorial-05": "tutoriales/05-errores-django.html",
            "tutorial-06": "tutoriales/06-notes-app-categorias.html",
            "tutorial-07": "tutoriales/07-calculadora-academica.html",
            "tutorial-08": "tutoriales/08-directorio-contactos-mini-crm.html",
            "tutorial-09": "tutoriales/09-blog-profesional-admin.html",
            "tutorial-10": "tutoriales/10-helpdesk-tickets.html",
            "tutorial-11": "tutoriales/11-dashboard-datos.html",
            "tutorial-12": "tutoriales/12-portafolio-github-pages.html",
            "tutorial-13": "tutoriales/13-documentacion-demo-final.html"
          };
          lastUrl = urls[lastTutorial];
          if (lastUrl) {
            banner.classList.add("is-visible");
            const link = banner.querySelector("[data-continue-link]");
            if (link) link.href = lastUrl;
          }
        }
      }
    } catch (e) {
      /* silent */
    }
  }

  function initOsTabs() {
    document.querySelectorAll(".os-tabs").forEach(function (tabs) {
      const btns = tabs.querySelectorAll(".os-tab-btn");
      const panels = tabs.querySelectorAll(".os-tab-panel");

      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          const target = btn.getAttribute("data-os-tab");
          btns.forEach(function (b) { b.classList.remove("is-active"); });
          panels.forEach(function (p) { p.classList.remove("is-active"); });
          btn.classList.add("is-active");
          const panel = tabs.querySelector('[data-os-panel="' + target + '"]');
          if (panel) panel.classList.add("is-active");
        });
      });
    });
  }

  function initActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll(".app-bar__nav a, .mobile-nav a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http")) return;
      if (path.endsWith(href) || (href === "index.html" && (path.endsWith("/") || path.endsWith("index.html")))) {
        link.classList.add("is-active");
      }
    });
  }
})();
