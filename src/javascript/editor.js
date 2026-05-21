let currentTheme = "vdb-theme";
const fileNameInput = document.getElementById("file-name");
const saveMenu = document.getElementById("save-menu");

const uploadBtn = document.getElementById("file-upload-btn");
const uploadInput = document.getElementById("file-upload");

// -------------------- HTML EDITOR --------------------
const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById("editor-html"),
  {
    mode: "htmlmixed",
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    theme: currentTheme,

    lint: true,
    gutters: ["CodeMirror-lint-markers"],

    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Cmd-Space": "autocomplete",
    },
  },
);

// -------------------- CSS EDITOR --------------------
const cssEditor = CodeMirror.fromTextArea(
  document.getElementById("editor-css"),
  {
    mode: "css",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    theme: currentTheme,

    lint: true,
    gutters: ["CodeMirror-lint-markers"],

    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Cmd-Space": "autocomplete",
    },
  },
);

// -------------------- JS EDITOR --------------------
const jsEditor = CodeMirror.fromTextArea(document.getElementById("editor-js"), {
  mode: "javascript",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  theme: currentTheme,

  lint: true,
  gutters: ["CodeMirror-lint-markers"],

  extraKeys: {
    "Ctrl-Space": "autocomplete",
    "Cmd-Space": "autocomplete",
  },
});

// -------------------- AUTOCOMPLETE --------------------
htmlEditor.on("inputRead", function (cm) {
  if (cm.state.completionActive) return;
  CodeMirror.commands.autocomplete(cm, null, {
    completeSingle: false,
  });
});

cssEditor.on("inputRead", function (cm) {
  if (cm.state.completionActive) return;
  CodeMirror.commands.autocomplete(cm, null, {
    completeSingle: false,
  });
});

jsEditor.on("inputRead", function (cm) {
  if (cm.state.completionActive) return;
  CodeMirror.commands.autocomplete(cm, null, {
    completeSingle: false,
  });
});

// -------------------- CHANGE EVENTS --------------------
htmlEditor.on("change", ResetTimer);
cssEditor.on("change", ResetTimer);
jsEditor.on("change", ResetTimer);

// -------------------- SAVE MENU --------------------
function OpenSaveMenu() {
  saveMenu.style.display = "flex";
  EnableOverlay(true);
}

// -------------------- DOWNLOAD PROJECT --------------------
async function DownloadProject() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const fullHtml = `<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  let name = fileNameInput.value.trim() || "index";
  link.download = name + ".html";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(link.href);

  EnableOverlay(false);
  fileNameInput.value = "";
  saveMenu.style.display = "none";
}

// -------------------- UPLOAD FILE --------------------
uploadBtn.addEventListener("click", () => {
  uploadInput.click();
});

uploadInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const css = [...doc.querySelectorAll("style")]
      .map((style) => style.textContent.trim())
      .filter(Boolean)
      .join("\n\n");

    const js = [...doc.querySelectorAll("script")]
      .map((script) => script.textContent.trim())
      .filter(Boolean)
      .join("\n\n");

    doc.querySelectorAll("style, script").forEach((el) => el.remove());

    const html = doc.body.innerHTML.trim();

    htmlEditor.setValue(html);
    cssEditor.setValue(css);
    jsEditor.setValue(js);
  };

  reader.readAsText(file);
  uploadInput.value = "";
});

// -------------------- LOCAL STORAGE --------------------
GetFromLocalStorage();

function GetFromLocalStorage() {
  htmlEditor.setValue(localStorage.getItem("htmlCode") || "");
  cssEditor.setValue(localStorage.getItem("cssCode") || "");
  jsEditor.setValue(localStorage.getItem("jsCode") || "");
}

function SaveToLocalStorage() {
  localStorage.setItem("htmlCode", htmlEditor.getValue());
  localStorage.setItem("cssCode", cssEditor.getValue());
  localStorage.setItem("jsCode", jsEditor.getValue());
}

// -------------------- WIPE PROJECT --------------------
function WipeProject() {
  htmlEditor.setValue("");
  cssEditor.setValue("");
  jsEditor.setValue("");
}

//--------------------- Theme --------------------------
function SetTheme(theme) {
  currentTheme = theme;

  themeLink.href = `./src/styling/themes/${theme}.css`;

  htmlEditor.setOption("theme", theme);
  cssEditor.setOption("theme", theme);
  jsEditor.setOption("theme", theme);
}
