const themes = ["vdb-theme", "dracula", "tomorrow"];

const head = document.head;

const themeLink = document.createElement("link");
themeLink.rel = "stylesheet";
themeLink.id = "theme-link";
head.appendChild(themeLink);

const themeDropdown = document.getElementById("theme-dropdown");

themes.forEach((theme) => {
  themeDropdown.innerHTML += `<option>${theme.toUpperCase()}</option>`;
});

themeDropdown.selectedIndex = localStorage.getItem("themeIndex");
SetTheme(themes[localStorage.getItem("themeIndex")]);

themeDropdown.addEventListener("change", () => {
  SetTheme(themeDropdown.value.toLowerCase());
});

window.addEventListener("beforeunload", (event) => {
  localStorage.setItem(
    "themeIndex",
    themes.indexOf(themeDropdown.value.toLowerCase()),
  );
});
