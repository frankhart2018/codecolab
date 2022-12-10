import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import NoFileSelected from "../no-file-selected/NoFileSelected";

const EditorWindow = () => {
  const { fileContents, fileContentsLoading, noFileSelected, openFileStack } =
    useSelector((state) => state.file);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(openFileStack);
  }, [openFileStack]);

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
                    value={index + 1}
                    style={{ color: "#cdcdcc", textTransform: "none" }}
                    autoCapitalize="none"
                  />
                ))}
              </TabList>
            </Box>
          </TabContext>
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
