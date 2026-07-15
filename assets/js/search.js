/**
 * Search and filter — includes base tutorials + portfolio projects
 */
(function () {
  "use strict";

  const TUTORIALS = [
    {
      id: "tutorial-01",
      title: "Instala VS Code y Python",
      desc: "Prepara tu computadora desde cero y verifica que Python realmente funciona.",
      url: "tutoriales/01-instalar-vscode-python.html",
      keywords: ["python", "vscode", "instalar", "terminal", "base django"]
    },
    {
      id: "tutorial-02",
      title: "Entornos controlados + Django",
      desc: "Crea un entorno virtual e instala Django sin contaminar otros proyectos.",
      url: "tutoriales/02-entornos-django.html",
      keywords: ["entorno", "virtual", "venv", "django", "pip", "base django"]
    },
    {
      id: "tutorial-03",
      title: "Tu primera ventana en Django",
      desc: "Conecta proyecto, aplicación, URL, vista y template.",
      url: "tutoriales/03-primera-ventana-django.html",
      keywords: ["django", "url", "views", "templates", "base django"]
    },
    {
      id: "tutorial-04",
      title: "Web App To-Do + Login",
      desc: "Aplicación de tareas con autenticación. Fase 1 del portafolio.",
      url: "tutoriales/04-todo-app-autenticacion.html",
      keywords: ["todo", "login", "auth", "crud", "mini-proyecto", "fase 1"]
    },
    {
      id: "tutorial-05",
      title: "Errores comunes de Django",
      desc: "Diagnostica fallos de instalación, rutas, templates y migraciones.",
      url: "tutoriales/05-errores-django.html",
      keywords: ["errores", "debug", "base django"]
    },
    {
      id: "tutorial-06",
      title: "Notes App con categorías",
      desc: "Notas privadas con categorías, favoritos, búsqueda y filtros.",
      url: "tutoriales/06-notes-app-categorias.html",
      keywords: ["notes", "notas", "categorías", "crud", "auth", "mini-proyecto", "fase 1"]
    },
    {
      id: "tutorial-07",
      title: "Calculadora Académica",
      desc: "Calcula promedios, estados y recomendaciones académicas.",
      url: "tutoriales/07-calculadora-academica.html",
      keywords: ["calculadora", "promedio", "formularios", "mini-proyecto", "fase 1"]
    },
    {
      id: "tutorial-08",
      title: "Mini CRM de Contactos",
      desc: "Directorio con búsqueda, filtros, estados y estadísticas.",
      url: "tutoriales/08-directorio-contactos-mini-crm.html",
      keywords: ["crm", "contactos", "crud", "auth", "proyecto guiado", "fase 2"]
    },
    {
      id: "tutorial-09",
      title: "Blog Profesional con Admin",
      desc: "Blog público administrado desde Django Admin con slugs y categorías.",
      url: "tutoriales/09-blog-profesional-admin.html",
      keywords: ["blog", "admin", "slug", "proyecto guiado", "fase 2"]
    },
    {
      id: "tutorial-10",
      title: "HelpDesk de Tickets",
      desc: "Sistema de soporte con estados, prioridades y roles usuario/staff.",
      url: "tutoriales/10-helpdesk-tickets.html",
      keywords: ["helpdesk", "tickets", "auth", "crud", "proyecto profesional", "fase 3"]
    },
    {
      id: "tutorial-11",
      title: "Dashboard de Datos",
      desc: "Gastos, métricas y gráficos con Django y Chart.js.",
      url: "tutoriales/11-dashboard-datos.html",
      keywords: ["dashboard", "chart.js", "datos", "proyecto profesional", "fase 3"]
    },
    {
      id: "tutorial-12",
      title: "Portafolio en GitHub Pages",
      desc: "Página personal estática para mostrar todos tus proyectos.",
      url: "tutoriales/12-portafolio-github-pages.html",
      keywords: ["portafolio", "github pages", "proyecto final", "fase 4"]
    },
    {
      id: "tutorial-13",
      title: "Documentación y Demo Final",
      desc: "README profesional, video demo y checklist de graduación.",
      url: "tutoriales/13-documentacion-demo-final.html",
      keywords: ["readme", "demo", "documentación", "proyecto final", "fase 4"]
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
        const keywords = card.getAttribute("data-keywords") || "";
        const haystack = tutorial
          ? (tutorial.title + " " + tutorial.desc + " " + tutorial.keywords.join(" ")).toLowerCase()
          : (card.textContent + " " + keywords).toLowerCase();
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
        } else if (!inTutorials && href.indexOf("ruta-portafolio") === 0) {
          href = t.url;
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
