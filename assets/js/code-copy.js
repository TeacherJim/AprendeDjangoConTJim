/**
 * Copy code to clipboard
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-copy-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const windowEl = btn.closest(".code-window");
        if (!windowEl) return;

        const code = windowEl.querySelector("code");
        if (!code) return;

        const text = code.textContent;

        function onSuccess() {
          btn.classList.add("is-copied");
          const original = btn.querySelector(".copy-btn__text");
          if (original) original.textContent = "Copiado";
          btn.setAttribute("aria-label", "Código copiado");

          const live = document.getElementById("copy-announcer");
          if (live) live.textContent = "Código copiado al portapapeles";

          setTimeout(function () {
            btn.classList.remove("is-copied");
            if (original) original.textContent = "Copiar";
            btn.setAttribute("aria-label", "Copiar código");
          }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(onSuccess).catch(fallbackCopy);
        } else {
          fallbackCopy();
        }

        function fallbackCopy() {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand("copy");
            onSuccess();
          } catch (e) {
            /* silent */
          }
          document.body.removeChild(textarea);
        }
      });
    });
  });
})();
