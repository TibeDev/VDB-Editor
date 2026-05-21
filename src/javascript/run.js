let timeOutId;
const idleTime = 150;

function ResetTimer() {
  console.log("resetting timer");
  clearTimeout(timeOutId);

  timeOutId = setTimeout(() => {
    run();
  }, idleTime);
}

function run() {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;

  const output = document.getElementById("output").contentWindow.document;

  output.open();
  output.write(html + css + js);
  output.close();
  SaveToLocalStorage();
}
