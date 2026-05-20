const theme = "vdb-theme";

const htmlEditor = CodeMirror.fromTextArea(
  document.getElementById("editor-html"),
  {
    mode: "htmlmixed",
    lineNumbers: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    theme: theme,

    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Cmd-Space": "autocomplete",
    },
  },
);

const cssEditor = CodeMirror.fromTextArea(
  document.getElementById("editor-css"),
  {
    mode: "css",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    theme: theme,

    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Cmd-Space": "autocomplete",
    },
  },
);

const jsEditor = CodeMirror.fromTextArea(document.getElementById("editor-js"), {
  mode: "javascript",
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  theme: theme,

  extraKeys: {
    "Ctrl-Space": "autocomplete",
    "Cmd-Space": "autocomplete",
  },
});

htmlEditor.on("inputRead", function (cm, change) {
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

htmlEditor.on("change", ResetTimer);
cssEditor.on("change", ResetTimer);
jsEditor.on("change", ResetTimer);
