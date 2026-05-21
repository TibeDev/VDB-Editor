const layoutEls = document.querySelectorAll(".layout-el");
const layoutDropdown = document.getElementById("layout-dropdown");

const layouts = ["horizontal", "vertical"];

let editorSplit;
let mainSplit;

layouts.forEach((layout) => {
  layoutDropdown.innerHTML += `
    <option value="${layout}">
      ${layout}
    </option>
  `;
});

layoutDropdown.addEventListener("change", () => {
  changeLayout(layoutDropdown.value);
});

changeLayout(layoutDropdown.value);

function changeLayout(layout) {
  layoutEls.forEach((element) => {
    layouts.forEach((item) => {
      element.classList.remove(item);
    });

    element.classList.add(layout);
  });

  if (editorSplit) editorSplit.destroy();
  if (mainSplit) mainSplit.destroy();

  if (layout === "vertical") {
    editorSplit = Split(["#html-panel", "#css-panel", "#js-panel"], {
      direction: "vertical",
      sizes: [33, 33, 34],
      minSize: 100,
      gutterSize: 8,
    });

    mainSplit = Split(["#editor-panel", "#output"], {
      direction: "horizontal",
      sizes: [60, 40],
      minSize: [150, 100],
      gutterSize: 8,
    });
  } else {
    editorSplit = Split(["#html-panel", "#css-panel", "#js-panel"], {
      direction: "horizontal",
      sizes: [33, 33, 34],
      minSize: 100,
      gutterSize: 8,
    });

    mainSplit = Split(["#editor-panel", "#output"], {
      direction: "vertical",
      sizes: [60, 40],
      minSize: [150, 100],
      gutterSize: 8,
    });
  }
}
