import Editor from "@monaco-editor/react";

const EditorWindow = () => {
  return (
    <Editor
      height="100vh"
      width={"50%"}
      defaultLanguage="python"
      defaultValue="# some comment"
      theme="vs-dark"
    />
  );
};

export default EditorWindow;
