const layoutEls = document.querySelectorAll(".layout-el");
const layoutDropdown = document.getElementById("layout-dropdown");

const layouts = [
  { layout: "horizontal", editorSize: [33, 33, 34] },
  { layout: "vertical", editorSize: [33, 33, 34] },
];

const editorNavs = document.querySelectorAll(".editor-nav");
editorNavs.forEach((nav) => {
  nav.addEventListener("dblclick", () => SetEditorSize(nav));
});

let editorSplit;
let mainSplit;

layouts.forEach((layout) => {
  layoutDropdown.innerHTML += `
      <option>
        ${layout.layout.toUpperCase()}
      </option>
    `;
});

layoutDropdown.addEventListener("change", () => {
  changeLayout(layoutDropdown.value);
});

changeLayout(layoutDropdown.value);

function changeLayout(layoutType) {
  layoutType = layoutType.toLowerCase();
  layoutEls.forEach((element) => {
    layouts.forEach((item) => {
      element.classList.remove(item.layout);
    });

    element.classList.add(layoutType);
  });

  if (editorSplit) editorSplit.destroy();
  if (mainSplit) mainSplit.destroy();

  let layout;
  layouts.forEach((element) => {
    if (element.layout === layoutType) layout = element;
  });

  let oppositeLayout = layoutType == "vertical" ? "horizontal" : "vertical";

  editorSplit = Split(["#html-panel", "#css-panel", "#js-panel"], {
    direction: layoutType,
    sizes: layout.editorSize,
    minSize: 0,
    snapOffset: 40,
    gutterSize: 8,
  });

  mainSplit = Split(["#editor-panel", "#output"], {
    direction: oppositeLayout,
    sizes: [40, 60],
    minSize: 0,
    snapOffset: 40,
    gutterSize: 8,
  });
}

function SetEditorSize(navEl) {
  const editorSize = JSON.parse(navEl.dataset.size);
  const currentSizes = editorSplit.getSizes();

  const biggestSize = Math.max(...editorSize);
  const biggestIndex = editorSize.indexOf(biggestSize);

  if (currentSizes[biggestIndex] > 95) {
    changeLayout(layoutDropdown.value);
    return;
  }

  editorSplit.setSizes(editorSize);
}
