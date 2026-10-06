// Persists checkbox progress in the browser (localStorage), so it survives closing the page.
(function () {
  const PREFIX = "rag-guide:";
  const boxes = Array.from(document.querySelectorAll("input[type=checkbox][data-id]"));
  const bar = document.querySelector(".progress .bar span");
  const label = document.querySelector(".progress .count");

  function refresh() {
    const done = boxes.filter((b) => b.checked).length;
    if (bar) bar.style.width = boxes.length ? `${(100 * done) / boxes.length}%` : "0";
    if (label) label.textContent = `${done} / ${boxes.length} done`;
    document.querySelectorAll("[data-module]").forEach((el) => {
      const box = el.querySelector("input[type=checkbox][data-id]");
      el.classList.toggle("done", !!(box && box.checked));
    });
  }

  boxes.forEach((box) => {
    box.checked = localStorage.getItem(PREFIX + box.dataset.id) === "1";
    box.addEventListener("change", () => {
      localStorage.setItem(PREFIX + box.dataset.id, box.checked ? "1" : "0");
      refresh();
    });
  });
  refresh();
})();
