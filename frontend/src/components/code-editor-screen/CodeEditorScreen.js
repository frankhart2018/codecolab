import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Stack } from "@mui/material";

import FileStructure from "./file-structure/FileStructure";
import EditorWindow from "./editor-window/EditorWindow";
import OutputWindow from "./output-window/OutputWindow";
import { hasWritePermissionThunk } from "../../services/project-thunk";
import { userDataThunk } from "../../services/thunks";

const CodeEditorScreen = () => {
  const { currentUser } = useSelector((state) => state.userDetails);
  const { hasWritePermission } = useSelector((state) => state.project);

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      dispatch(
        hasWritePermissionThunk({
          project_id: pathname.split("/")[2],
          user_id: currentUser._id,
        })
      );
    }
  }, []);

  return (
    <Stack direction="row" alignItems="center">
      <FileStructure />
      <EditorWindow hasWriteAccess={hasWritePermission} />
      <OutputWindow hasWriteAccess={hasWritePermission} />
    </Stack>
  );
};

export default CodeEditorScreen;
