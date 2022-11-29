import { Stack } from "@mui/material";

import FileStructure from "./file-structure/FileStructure";
import EditorWindow from "./editor-window/EditorWindow";
import OutputWindow from "./output-window/OutputWindow";

const CodeEditorScreen = () => {
  return (
    <Stack direction="row" alignItems="center">
      <FileStructure />
      <EditorWindow />
      <OutputWindow />
    </Stack>
  );
};

export default CodeEditorScreen;
