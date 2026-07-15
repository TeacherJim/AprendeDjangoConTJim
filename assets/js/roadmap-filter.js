/**
 * Roadmap project filters
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const bar = document.querySelector("[data-roadmap-filters]");
    const grid = document.querySelector("[data-project-grid]");
    if (!bar || !grid) return;

    const chips = bar.querySelectorAll("[data-filter]");
    const cards = grid.querySelectorAll("[data-project-card]");
    const empty = document.querySelector("[data-roadmap-empty]");

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        const filter = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");

        let visible = 0;
        cards.forEach(function (card) {
          const tags = (card.getAttribute("data-tags") || "").toLowerCase();
          const match = filter === "all" || tags.indexOf(filter.toLowerCase()) !== -1;
          card.classList.toggle("project-card--hidden", !match);
          if (match) visible++;
        });

        if (empty) empty.classList.toggle("hidden", visible > 0);
      });
    });

    const search = document.querySelector("[data-roadmap-search]");
    if (search) {
      search.addEventListener("input", function () {
        const q = search.value.toLowerCase().trim();
        const activeChip = bar.querySelector(".filter-chip.is-active");
        const filter = activeChip ? activeChip.getAttribute("data-filter") : "all";
        let visible = 0;

        cards.forEach(function (card) {
          const tags = (card.getAttribute("data-tags") || "").toLowerCase();
          const text = card.textContent.toLowerCase();
          const tagMatch = filter === "all" || tags.indexOf(filter.toLowerCase()) !== -1;
          const textMatch = !q || text.indexOf(q) !== -1 || tags.indexOf(q) !== -1;
          const match = tagMatch && textMatch;
          card.classList.toggle("project-card--hidden", !match);
          if (match) visible++;
        });

        if (empty) empty.classList.toggle("hidden", visible > 0);
      });
    }
  });
})();
