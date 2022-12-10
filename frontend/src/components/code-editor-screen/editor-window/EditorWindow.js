import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import NoFileSelected from "../no-file-selected/NoFileSelected";
import RunTaskBar from "../run-taskbar/RunTaskBar";
import { runCodeThunk } from "../../../services/run-thunk";

const EditorWindow = () => {
  const {
    fileContents,
    fileContentsLoading,
    s3URI,
    noFileSelected,
    openFileMap,
    openFileStack,
  } = useSelector((state) => state.file);

  const [value, setValue] = useState("1");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRunCode = () => {
    dispatch(runCodeThunk({ s3URI }));
  };

  return (
    <>
      {noFileSelected && <NoFileSelected />}
      {!noFileSelected && fileContentsLoading && (
        <NoFileSelected message="Loading file..." />
      )}
      {!noFileSelected && !fileContentsLoading && (
        <Box
          sx={{
            width: "50%",
            height: "100vh",
            background: "#1F1F1E",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {openFileStack.map((file, index) => (
                  <Tab
                    label={file}
                    value={(index + 1).toString()}
                    style={{ color: "#cdcdcc", textTransform: "none" }}
                  />
                ))}
              </TabList>
            </Box>
          </TabContext>
          <RunTaskBar handleRunCode={handleRunCode} />
          <Editor
            height="100vh"
            defaultLanguage="python"
            defaultValue={fileContents}
            theme="vs-dark"
          />
        </Box>
      )}
    </>
  );
};

export default EditorWindow;
