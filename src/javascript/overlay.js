const overlay = document.getElementById("overlay");

function EnableOverlay(enable) {
  overlay.style.display = enable ? "flex" : "none";
}
document.addEventListener("keydown", () => {
  if (event.key === "Escape") {
    EnableOverlay(false);
  }
});
