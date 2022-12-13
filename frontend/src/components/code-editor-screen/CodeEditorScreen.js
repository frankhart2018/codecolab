import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Stack } from "@mui/material";

import FileStructure from "./file-structure/FileStructure";
import EditorWindow from "./editor-window/EditorWindow";
import OutputWindow from "./output-window/OutputWindow";
import { hasWritePermissionThunk } from "../../services/project-thunk";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction="row" alignItems="center">
      <FileStructure hasWriteAccess={hasWritePermission} />
      <EditorWindow hasWriteAccess={hasWritePermission} />
      <OutputWindow hasWriteAccess={hasWritePermission} />
    </Stack>
  );
};

export default CodeEditorScreen;
