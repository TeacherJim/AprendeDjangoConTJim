/**
 * Portfolio roadmap progress tracking
 */
(function () {
  "use strict";

  const STORAGE_KEY = "tj-progress";
  const TOTAL_MISSIONS = 13;

  const MISSION_IDS = [
    "tutorial-01", "tutorial-02", "tutorial-03", "tutorial-04", "tutorial-05",
    "tutorial-06", "tutorial-07", "tutorial-08", "tutorial-09", "tutorial-10",
    "tutorial-11", "tutorial-12", "tutorial-13"
  ];

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function countCompleted() {
    const data = getProgress();
    return MISSION_IDS.filter(function (id) {
      return data[id] && data[id].completed;
    }).length;
  }

  function getCurrentPhase(completedCount) {
    if (completedCount >= 13) return 4;
    if (completedCount >= 10) return 4;
    if (completedCount >= 8) return 3;
    if (completedCount >= 5) return 2;
    if (completedCount >= 3) return 1;
    return 1;
  }

  function updateLandingSummary() {
    const el = document.querySelector("[data-portfolio-progress]");
    if (!el) return;
    const done = countCompleted();
    el.hidden = false;
    el.textContent = "Tu progreso profesional: " + done + " de " + TOTAL_MISSIONS + " misiones completadas";
    el.setAttribute("aria-live", "polite");
  }

  function updateProjectCards() {
    const data = getProgress();
    document.querySelectorAll("[data-project-card]").forEach(function (card) {
      const id = card.getAttribute("data-project-card");
      if (data[id] && data[id].completed) {
        card.classList.add("is-completed");
        const label = card.querySelector(".progress-bar__label");
        const fill = card.querySelector(".progress-bar__fill");
        if (label) label.textContent = "Completado";
        if (fill) fill.style.width = "100%";
      }
    });
  }

  function updateRoadmapPhase() {
    const phaseEl = document.querySelector("[data-current-phase]");
    if (!phaseEl) return;
    const phase = getCurrentPhase(countCompleted());
    phaseEl.textContent = "Fase actual estimada: " + phase + " de 4";
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateLandingSummary();
    updateProjectCards();
    updateRoadmapPhase();
  });

  window.TJPortfolio = {
    getProgress: getProgress,
    countCompleted: countCompleted,
    TOTAL_MISSIONS: TOTAL_MISSIONS
  };
})();
