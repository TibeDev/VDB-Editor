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

const savedIndex = localStorage.getItem("themeIndex");
const themeIndex = savedIndex === null ? savedIndex : 0;
themeDropdown.selectedIndex = themeIndex;
SetTheme(themeIndex);

themeDropdown.addEventListener("change", () => {
  SetTheme(themeDropdown.value.toLowerCase());
});

window.addEventListener("beforeunload", (event) => {
  localStorage.setItem(
    "themeIndex",
    themes.indexOf(themeDropdown.value.toLowerCase()),
  );
});
