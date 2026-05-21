let layoutEls = document.querySelectorAll(".layout-el");
const layoutTypes = ["vertical", "horizontal"];
const layoutDropdown = document.getElementById("layout-dropdown");

layoutTypes.forEach((type) => {
  layoutDropdown.innerHTML += `<option>${type}</option>`;
});
layoutDropdown.addEventListener("change", () => {
  ChangeLayout(layoutDropdown.value);
});

ChangeLayout(layoutDropdown.value);

function ChangeLayout(layoutType) {
  layoutEls.forEach((element) => {
    element.classList.remove(...layoutTypes);
    element.classList.add(layoutType);
  });

  const editors = document.querySelectorAll(".editor");
  const resizers = document.querySelectorAll(".editor-resizer");

  editors.forEach((editor) => {
    editor.style.flex = "1 1 0";
  });

  resizers.forEach((resizer) => {
    resizer.classList.remove(...layoutTypes);
    resizer.classList.add(layoutType);
  });
}
