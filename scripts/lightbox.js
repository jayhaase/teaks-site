document.addEventListener("DOMContentLoaded", () => {
  const dialog = document.getElementById("lightbox");
  const triggers = Array.from(document.querySelectorAll(".gallery-trigger"));
  if (!dialog || triggers.length === 0) {
    return;
  }

  const image = dialog.querySelector(".lightbox-image");
  const closeButton = dialog.querySelector(".lightbox-close");
  const prevButton = dialog.querySelector(".lightbox-prev");
  const nextButton = dialog.querySelector(".lightbox-next");

  let currentIndex = 0;

  function show(index) {
    currentIndex = (index + triggers.length) % triggers.length;
    const trigger = triggers[currentIndex];
    image.src = trigger.dataset.full;
    image.alt = trigger.dataset.alt || "";
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      show(index);
      dialog.showModal();
      document.documentElement.classList.add("lightbox-open");
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  prevButton.addEventListener("click", () => show(currentIndex - 1));
  nextButton.addEventListener("click", () => show(currentIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      show(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      show(currentIndex + 1);
    }
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("lightbox-open");
  });
});
