const resizers = document.querySelectorAll(".editor-resizer");

let startPos = 0;
let startSizePrev = 0;
let startSizeNext = 0;

let prevEl;
let nextEl;
let isVertical = false;

resizers.forEach((resizer) => {
  resizer.addEventListener("mousedown", (e) => {
    prevEl = resizer.previousElementSibling;
    nextEl = resizer.nextElementSibling;

    isVertical = resizer.classList.contains("vertical");

    startPos = isVertical ? e.clientY : e.clientX;

    const prevRect = prevEl.getBoundingClientRect();
    const nextRect = nextEl.getBoundingClientRect();

    startSizePrev = isVertical ? prevRect.height : prevRect.width;
    startSizeNext = isVertical ? nextRect.height : nextRect.width;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    document.body.style.userSelect = "none";
    document.body.style.cursor = isVertical ? "row-resize" : "col-resize";
  });
});

function onMouseMove(e) {
  const currentPos = isVertical ? e.clientY : e.clientX;
  const delta = currentPos - startPos;

  const newPrevSize = startSizePrev + delta;
  const newNextSize = startSizeNext - delta;

  if (newPrevSize < 100 || newNextSize < 100) return;

  const container = prevEl.parentElement;

  const totalSize = isVertical ? container.clientHeight : container.clientWidth;

  const prevPercent = (newPrevSize / totalSize) * 100;
  const nextPercent = (newNextSize / totalSize) * 100;

  prevEl.style.flex = `0 0 ${prevPercent}%`;
  nextEl.style.flex = `0 0 ${nextPercent}%`;
}

function onMouseUp() {
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);

  document.body.style.userSelect = "";
  document.body.style.cursor = "";
}
