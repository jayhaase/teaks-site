document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".doodle-toggle").forEach((toggle) => {
    const mushroom = toggle.querySelector(".doodle-mushroom");
    const frog = toggle.querySelector(".doodle-frog");
    if (!mushroom || !frog) {
      return;
    }
    toggle.addEventListener("click", () => {
      const isFrog = !frog.hidden;
      mushroom.hidden = !isFrog;
      frog.hidden = isFrog;
      toggle.setAttribute(
        "aria-label",
        isFrog ? "Tap the toadstool" : "Tap the frog to turn it back",
      );
    });
  });

  document
    .querySelectorAll(".potion-card[data-reveal-description]")
    .forEach((card) => {
      const descriptionEl = card.querySelector(".potion-description");
      const hintEl = card.querySelector(".potion-hint");
      const { description, revealDescription, hint, revealHint } = card.dataset;
      let revealed = false;

      function toggleReveal() {
        revealed = !revealed;
        if (descriptionEl) {
          descriptionEl.textContent = revealed
            ? revealDescription
            : description;
        }
        if (hintEl) {
          hintEl.textContent = revealed ? revealHint : hint;
        }
      }

      card.addEventListener("click", toggleReveal);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleReveal();
        }
      });
    });
});
