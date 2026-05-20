const resizers = document.querySelectorAll(".editor-resizer");
const editors = document.querySelectorAll(".editor");

let startX = 0;
let startWidthLeft = 0;
let startWidthRight = 0;
let leftEl, rightEl;

resizers.forEach((resizer) => {
  resizer.addEventListener("mousedown", (e) => {
    startX = e.clientX;

    leftEl = resizer.previousElementSibling;
    rightEl = resizer.nextElementSibling;

    startWidthLeft = leftEl.getBoundingClientRect().width;
    startWidthRight = rightEl.getBoundingClientRect().width;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  });
});

function onMouseMove(e) {
  const dx = e.clientX - startX;

  const newLeftWidth = startWidthLeft + dx;
  const newRightWidth = startWidthRight - dx;

  if (newLeftWidth < 100 || newRightWidth < 100) return;

  leftEl.style.flex = `0 0 ${newLeftWidth}px`;
  rightEl.style.flex = `0 0 ${newRightWidth}px`;
}

function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);

  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

window.addEventListener("resize", () => {
  document.querySelectorAll(".editor").forEach((el) => {
    el.style.flex = "1 1 0";
  });
});
