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

  const shopFab = document.querySelector(".shop-fab");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (shopFab && !prefersReducedMotion) {
    const spawnSpark = () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 16 + Math.random() * 14;
      const spark = document.createElement("span");
      spark.className = "shop-fab-spark";
      spark.style.left = `${50 + Math.cos(angle) * 30}%`;
      spark.style.top = `${50 + Math.sin(angle) * 30}%`;
      spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      spark.addEventListener("animationend", () => spark.remove());
      shopFab.appendChild(spark);
    };

    const scheduleSpark = () => {
      spawnSpark();
      setTimeout(scheduleSpark, 1800 + Math.random() * 2400);
    };

    setTimeout(scheduleSpark, 1200 + Math.random() * 1800);
  }
});
