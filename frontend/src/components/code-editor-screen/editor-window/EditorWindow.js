import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

import NoFileSelected from "../no-file-selected/NoFileSelected";
import RunTaskBar from "../run-taskbar/RunTaskBar";
import { runCodeThunk } from "../../../services/run-thunk";
import { closeFile } from "../../../reducers/file-reducer";
import { closeFileInProject } from "../../../reducers/project-reducer";

const socket = io.connect(process.env.REACT_APP_CODE_SHARER_API_BASE);

const EditorWindow = ({ hasWriteAccess }) => {
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
  const { enqueueSnackbar } = useSnackbar();

  const { pathname } = useLocation();
  const projectId = pathname.split("/")[2];

  const handleChange = (event, newValue) => {
    setTabCode(tabCode.set(currentTab, [code, currentS3URI]));
    setCurrentTab(newValue);
    setCode(tabCode.get(newValue)[0]);
    setCurrentS3URI(tabCode.get(newValue)[1]);
  };

  useEffect(() => {
    if (currentTab !== "" && currentTab !== undefined && currentTab !== null) {
      if (socket.connected) {
        socket.disconnect();
      }
      socket.connect();
      socket.emit("view_code", {
        room_id: `${projectId}/${currentTab}`,
        code: tabCode.get(currentTab)[0],
      });
      socket.on("code", (data) => {
        setCode(data);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  useEffect(() => {
    socket.on("recv_code", (data) => {
      setCode(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, code]);

  useEffect(() => {
    setCurrentTab(currentlyOpenedFilePath);
    setCurrentS3URI(s3URI);
    setTabCode(tabCode.set(currentlyOpenedFilePath, [fileContents, s3URI]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyOpenedFilePath, fileContents, s3URI]);

  useEffect(() => {
    const latestTab = openFileStack[openFileStack.length - 1];
    setCurrentTab(latestTab);

    if (tabCode.has(latestTab)) {
      setCode(tabCode.get(latestTab)[0]);
      setCurrentS3URI(tabCode.get(latestTab)[1]);
    }
  }, [openFileStack, tabCode]);

  const handleRunCode = async () => {
    const response = await dispatch(
      runCodeThunk({
        s3URI: currentS3URI,
        project_id: projectId,
        code: code,
        path: currentTab,
      })
    );

    if (response.payload.error !== "") {
      enqueueSnackbar("There seems to be some error in your code!", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Code ran successfully!", {
        variant: "success",
      });
    }
  };

  const handleCloseClick = (file) => {
    dispatch(
      closeFile({
        file: file,
      })
    );

    dispatch(closeFileInProject());

    setTabCode(new Map([...tabCode].filter(([key]) => key !== file)));
    setCurrentTab(openFileStack[openFileStack.length - 1]);
    socket.disconnect();
  };

  return (
    <>
      {(noFileSelected || openFileStack.length === 0) &&
        !fileContentsLoading && <NoFileSelected />}
      {!noFileSelected && fileContentsLoading && (
        <NoFileSelected message="Loading file..." />
      )}
      {!noFileSelected && !fileContentsLoading && openFileStack.length > 0 && (
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
                    label={
                      <span>
                        {file}
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleCloseClick(file);
                          }}
                        >
                          <CloseIcon sx={{ color: "#cdcdcc" }} />
                        </IconButton>
                      </span>
                    }
                    value={file}
                    style={{ color: "#cdcdcc", textTransform: "none" }}
                  />
                ))}
              </TabList>
            </Box>
          </TabContext>
          {hasWriteAccess && <RunTaskBar handleRunCode={handleRunCode} />}
          <Editor
            height="100vh"
            defaultLanguage="python"
            value={code}
            options={{ readOnly: !hasWriteAccess }}
            onChange={(value) => {
              setCode(value);
              socket.emit("update_code", {
                room_id: `${projectId}/${currentTab}`,
                code: value,
              });
            }}
            theme="vs-dark"
          />
        </Box>
      )}
    </>
  );
};

export default EditorWindow;
