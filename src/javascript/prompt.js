const prompt = document.getElementById("prompt");
const questionText = document.getElementById("prompt-question");
const acceptBtn = document.getElementById("accept-btn");
const denyBtn = document.getElementById("deny-btn");

function ShowPrompt(question, acceptFunc) {
  prompt.style.display = "flex";
  questionText.textContent = question;
  acceptBtn.addEventListener("click", () => {
    acceptFunc();
    HidePrompt();
  });
  EnableOverlay(true);
}
function HidePrompt() {
  prompt.style.display = "none";
  EnableOverlay(false);
}
