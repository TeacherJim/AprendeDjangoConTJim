/**
 * Search and filter functionality
 */
(function () {
  "use strict";

  const TUTORIALS = [
    {
      id: "tutorial-01",
      title: "Instala VS Code y Python",
      desc: "Prepara tu computadora desde cero y verifica que Python realmente funciona.",
      url: "tutoriales/01-instalar-vscode-python.html",
      keywords: ["python", "vscode", "instalar", "terminal", "extensión"]
    },
    {
      id: "tutorial-02",
      title: "Entornos controlados + Django",
      desc: "Crea un entorno virtual e instala Django sin contaminar otros proyectos.",
      url: "tutoriales/02-entornos-django.html",
      keywords: ["entorno", "virtual", "venv", "django", "pip", "requirements"]
    },
    {
      id: "tutorial-03",
      title: "Tu primera ventana en Django",
      desc: "Conecta proyecto, aplicación, URL, vista y template.",
      url: "tutoriales/03-primera-ventana-django.html",
      keywords: ["django", "url", "views", "templates", "vista", "proyecto", "app"]
    },
    {
      id: "tutorial-04",
      title: "Web App To-Do + Login",
      desc: "Construye una aplicación de tareas con autenticación y animaciones.",
      url: "tutoriales/04-todo-app-autenticacion.html",
      keywords: ["todo", "login", "autenticación", "csrf", "modelo", "formulario", "usuario"]
    },
    {
      id: "tutorial-05",
      title: "Errores comunes de Django",
      desc: "Diagnostica fallos de instalación, rutas, templates, migraciones y más.",
      url: "tutoriales/05-errores-django.html",
      keywords: ["errores", "django", "migraciones", "csrf", "template", "debug", "404", "403"]
    }
  ];

  document.addEventListener("DOMContentLoaded", function () {
    initCardFilter();
    initSearchOverlay();
    initErrorSearch();
  });

  function initCardFilter() {
    const input = document.querySelector("[data-tutorial-filter]");
    const grid = document.querySelector("[data-tutorial-grid]");
    const empty = document.querySelector("[data-empty-state]");
    if (!input || !grid) return;

    input.addEventListener("input", function () {
      const query = input.value.toLowerCase().trim();
      const cards = grid.querySelectorAll("[data-tutorial-card]");
      let visible = 0;

      cards.forEach(function (card) {
        const id = card.getAttribute("data-tutorial-card");
        const tutorial = TUTORIALS.find(function (t) { return t.id === id; });
        if (!tutorial) return;

        const haystack = (tutorial.title + " " + tutorial.desc + " " + tutorial.keywords.join(" ")).toLowerCase();
        const match = !query || haystack.indexOf(query) !== -1;
        card.style.display = match ? "" : "none";
        if (match) visible++;
      });

      if (empty) empty.classList.toggle("hidden", visible > 0);
    });
  }

  function initSearchOverlay() {
    const openBtns = document.querySelectorAll("[data-search-open]");
    const overlay = document.querySelector("[data-search-overlay]");
    const input = document.querySelector("[data-search-input]");
    const results = document.querySelector("[data-search-results]");
    if (!overlay || !input) return;

    function openSearch() {
      overlay.classList.add("is-open");
      input.value = "";
      renderResults("");
      input.focus();
    }

    function closeSearch() {
      overlay.classList.remove("is-open");
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener("click", openSearch);
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    });

    input.addEventListener("input", function () {
      renderResults(input.value);
    });

    function renderResults(query) {
      if (!results) return;
      const q = query.toLowerCase().trim();
      const matches = TUTORIALS.filter(function (t) {
        if (!q) return true;
        const haystack = (t.title + " " + t.desc + " " + t.keywords.join(" ")).toLowerCase();
        return haystack.indexOf(q) !== -1;
      });

      if (matches.length === 0) {
        results.innerHTML = '<p style="padding:1rem 1.5rem;color:var(--md-sys-color-on-surface-variant)">Sin resultados</p>';
        return;
      }

      const inTutorials = window.location.pathname.indexOf("/tutoriales/") !== -1 ||
        window.location.pathname.indexOf("\\tutoriales\\") !== -1;

      results.innerHTML = matches.map(function (t) {
        let href = t.url;
        if (inTutorials && href.indexOf("tutoriales/") === 0) {
          href = href.replace("tutoriales/", "");
        }
        return '<a class="search-result-item" href="' + href + '">' +
          t.title + '<small>' + t.desc + '</small></a>';
      }).join("");
    }
  }

  function initErrorSearch() {
    const input = document.querySelector("[data-error-search]");
    if (!input) return;

    input.addEventListener("input", function () {
      const query = input.value.toLowerCase().trim();
      const cards = document.querySelectorAll("[data-error-card]");

      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
        const match = !query || text.indexOf(query) !== -1 || keywords.indexOf(query) !== -1;
        card.classList.toggle("is-hidden", !match);
      });
    });
  }
})();
