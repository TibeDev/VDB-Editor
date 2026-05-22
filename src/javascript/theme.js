const themes = ["vdb-theme", "dracula", "frosted-flowers", "vscode"];

const head = document.head;

const themeLinkPage = document.createElement("link");
themeLinkPage.rel = "stylesheet";
themeLinkPage.id = "theme-link-page";
head.appendChild(themeLinkPage);

const themeDropdown = document.getElementById("theme-dropdown");

themes.forEach((theme) => {
  themeDropdown.innerHTML += `<option>${theme.toUpperCase()}</option>`;
});

const themeIndex = Number(localStorage.getItem("themeIndex")) || 0;

themeDropdown.selectedIndex = themeIndex;
SetTheme(themes[themeIndex]);

themeDropdown.addEventListener("change", () => {
  SetTheme(themeDropdown.value.toLowerCase());
});

window.addEventListener("beforeunload", (event) => {
  localStorage.setItem(
    "themeIndex",
    themes.indexOf(themeDropdown.value.toLowerCase()),
  );
});

function SetTheme(theme) {
  themeLinkPage.href = `./src/styling/themes/${theme}/${theme}.css`;
}

// function SetEditorTheme(theme) {
//   currentTheme = theme;

//   themeLinkCodeMirror.href = `./src/styling/themes/${theme}/${theme}-codemirror.css`;

//   htmlEditor.setOption("theme", theme);
//   cssEditor.setOption("theme", theme);
//   jsEditor.setOption("theme", theme);
// }

// function SetPageTheme(theme) {
//   themeLinkPage.href = `./src/styling/themes/${theme}/${theme}-page.css`;
// }
