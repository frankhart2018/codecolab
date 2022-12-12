import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
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
    openFileStack,
  } = useSelector((state) => state.file);

  const { currentlyOpenedFilePath } = useSelector((state) => state.project);

  const [currentTab, setCurrentTab] = useState("");
  const [code, setCode] = useState("");
  const [currentS3URI, setCurrentS3URI] = useState("");
  const [tabCode, setTabCode] = useState(new Map());
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const projectId = pathname.split("/")[2];

  const handleChange = (event, newValue) => {
    setTabCode(tabCode.set(currentTab, [code, currentS3URI]));
    console.log(tabCode);
    setCurrentTab(newValue);
    setCode(tabCode.get(newValue)[0]);
    setCurrentS3URI(tabCode.get(newValue)[1]);
  };

  useEffect(() => {
    setCurrentTab(currentlyOpenedFilePath);
    setCode(fileContents);
    setCurrentS3URI(s3URI);
    setTabCode(tabCode.set(currentlyOpenedFilePath, [fileContents, s3URI]));
  }, [currentlyOpenedFilePath, fileContents, s3URI]);

  const handleRunCode = () => {
    dispatch(
      runCodeThunk({
        s3URI: currentS3URI,
        project_id: projectId,
        code: code,
        path: currentTab,
      })
    );
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
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                TabIndicatorProps={{ style: { backgroundColor: "white" } }}
              >
                {openFileStack.map((file) => (
                  <Tab
                    label={file}
                    value={file}
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
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
            theme="vs-dark"
          />
        </Box>
      )}
    </>
  );
};

export default EditorWindow;
