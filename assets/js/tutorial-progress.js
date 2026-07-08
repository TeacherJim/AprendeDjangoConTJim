/**
 * Tutorial progress tracking via localStorage
 */
(function () {
  "use strict";

  const STORAGE_KEY = "tj-progress";

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function saveProgress(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getTutorialId() {
    const el = document.querySelector("[data-tutorial-id]");
    return el ? el.getAttribute("data-tutorial-id") : null;
  }

  function markVisited() {
    const id = getTutorialId();
    if (!id) return;
    const data = getProgress();
    if (!data[id]) data[id] = { completed: false, steps: [] };
    data[id].lastVisited = Date.now();
    saveProgress(data);
  }

  function toggleStep(stepId, checked) {
    const id = getTutorialId();
    if (!id) return;
    const data = getProgress();
    if (!data[id]) data[id] = { completed: false, steps: [] };
    if (checked && data[id].steps.indexOf(stepId) === -1) {
      data[id].steps.push(stepId);
    } else if (!checked) {
      data[id].steps = data[id].steps.filter(function (s) { return s !== stepId; });
    }
    saveProgress(data);
    updateStepUI(stepId, checked);
    updateProgressUI();
  }

  function markCompleted() {
    const id = getTutorialId();
    if (!id) return;
    const data = getProgress();
    if (!data[id]) data[id] = { steps: [] };
    data[id].completed = true;
    data[id].completedAt = Date.now();
    saveProgress(data);
    updateProgressUI();

    const btn = document.querySelector("[data-complete-tutorial]");
    if (btn) {
      btn.textContent = "Tutorial completado";
      btn.disabled = true;
      btn.classList.add("btn--secondary");
    }
  }

  function updateStepUI(stepId, checked) {
    const step = document.getElementById(stepId);
    if (step) step.classList.toggle("is-completed", checked);
  }

  function updateProgressUI() {
    const id = getTutorialId();
    if (!id) return;
    const data = getProgress();
    const entry = data[id] || { steps: [], completed: false };
    const totalSteps = document.querySelectorAll(".tutorial-step").length;
    const doneSteps = entry.steps ? entry.steps.length : 0;
    const pct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

    const bar = document.querySelector("[data-reading-progress-bar]");
    const label = document.querySelector("[data-step-progress-label]");
    if (bar) bar.style.width = pct + "%";
    if (label) label.textContent = doneSteps + " de " + totalSteps + " pasos (" + pct + "%)";

    if (entry.completed) {
      const btn = document.querySelector("[data-complete-tutorial]");
      if (btn) {
        btn.textContent = "Tutorial completado";
        btn.disabled = true;
      }
    }
  }

  function restoreSteps() {
    const id = getTutorialId();
    if (!id) return;
    const data = getProgress();
    const entry = data[id];
    if (!entry || !entry.steps) return;

    entry.steps.forEach(function (stepId) {
      const checkbox = document.querySelector('[data-step-check="' + stepId + '"]');
      if (checkbox) {
        checkbox.checked = true;
        updateStepUI(stepId, true);
      }
    });
    updateProgressUI();
  }

  function initToc() {
    const toggle = document.querySelector("[data-toc-toggle]");
    const panel = document.querySelector("[data-toc-panel]");
    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        const isOpen = panel.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    const tocLinks = document.querySelectorAll(".toc-list a");
    const sections = document.querySelectorAll(".tutorial-step, .tutorial-section[id]");

    if ("IntersectionObserver" in window && sections.length > 0) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      }, { rootMargin: "-20% 0px -60% 0px", threshold: 0 });

      sections.forEach(function (section) {
        if (section.id) observer.observe(section);
      });
    }
  }

  function initReadingProgress() {
    const bar = document.querySelector("[data-reading-progress-bar]");
    if (!bar) return;

    window.addEventListener("scroll", function () {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      const scrollBar = document.querySelector("[data-scroll-progress-bar]");
      if (scrollBar) scrollBar.style.width = Math.min(100, scrolled) + "%";
    }, { passive: true });
  }

  function updateLandingProgress() {
    const data = getProgress();
    const cards = document.querySelectorAll("[data-tutorial-card]");

    cards.forEach(function (card) {
      const id = card.getAttribute("data-tutorial-card");
      const entry = data[id];
      if (!entry) return;

      const totalSteps = parseInt(card.getAttribute("data-total-steps") || "0", 10);
      const doneSteps = entry.steps ? entry.steps.length : 0;
      const pct = totalSteps > 0 ? Math.round((doneSteps / totalSteps) * 100) : 0;

      const fill = card.querySelector(".progress-bar__fill");
      const label = card.querySelector(".progress-bar__label");
      if (fill) fill.style.width = (entry.completed ? 100 : pct) + "%";
      if (label) {
        label.textContent = entry.completed ? "Completado" : pct + "% completado";
      }
      if (entry.completed) card.classList.add("tutorial-card--completed");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    markVisited();
    restoreSteps();
    initToc();
    initReadingProgress();
    updateLandingProgress();

    document.querySelectorAll("[data-step-check]").forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        toggleStep(checkbox.getAttribute("data-step-check"), checkbox.checked);
      });
    });

    const completeBtn = document.querySelector("[data-complete-tutorial]");
    if (completeBtn) {
      completeBtn.addEventListener("click", markCompleted);
    }
  });

  window.TJProgress = { getProgress: getProgress, updateLandingProgress: updateLandingProgress };
})();
