import Editor from "@monaco-editor/react";
import { useSelector } from "react-redux";
import NoFileSelected from "../no-file-selected/NoFileSelected";

const EditorWindow = () => {
  const { fileContents, fileContentsLoading, noFileSelected } = useSelector(
    (state) => state.file
  );

  return (
    <>
      {noFileSelected && <NoFileSelected />}
      {!noFileSelected && fileContentsLoading && (
        <NoFileSelected message="Loading file..." />
      )}
      {!noFileSelected && !fileContentsLoading && (
        <Editor
          height="100vh"
          width={"50%"}
          defaultLanguage="python"
          defaultValue={fileContents}
          theme="vs-dark"
        />
      )}
    </>
  );
};

export default EditorWindow;
