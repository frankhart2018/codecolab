import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Star, StarBorder, Share } from "@mui/icons-material";

import { getPythonVersionThunk } from "../../../services/pyrunner-thunk";
import {
  giveEditPermissionThunk,
  giveViewPermissionThunk,
  isProjectStarredThunk,
  starProjectThunk,
  unstarProjectThunk,
} from "../../../services/project-thunk";
import { useSnackbar } from "notistack";

const OutputWindow = ({ hasWriteAccess }) => {
  const { pythonVersion, pythonVersionLoading } = useSelector(
    (state) => state.pyrunner
  );
  const { currentUser } = useSelector((state) => state.userDetails);
  const { output, outputLoading } = useSelector((state) => state.run);
  const { isProjectStarred } = useSelector((state) => state.project);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [sharePermission, setSharePermission] = useState("viewer");
  const { enqueueSnackbar } = useSnackbar();

  const { pathname } = useLocation();
  const projectId = pathname.split("/")[2];

  const dispatch = useDispatch();

  const handleStarProject = () => {
    if (!isProjectStarred) {
      dispatch(
        starProjectThunk({
          user_id: currentUser._id,
          project_id: projectId,
        })
      );
    } else {
      dispatch(
        unstarProjectThunk({
          user_id: currentUser._id,
          project_id: projectId,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getPythonVersionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(
        isProjectStarredThunk({
          user_id: currentUser._id,
          project_id: projectId,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleShareDialogOpen = () => {
    setShowShareDialog(true);
  };

  const handleShareDialogClose = () => {
    setShowShareDialog(false);
  };

  const handleShareDialogSubmit = async () => {
    let response;

    if (sharePermission === "viewer") {
      response = await dispatch(
        giveViewPermissionThunk({
          project_id: projectId,
          email_id: shareEmail,
        })
      );
    } else {
      response = await dispatch(
        giveEditPermissionThunk({
          project_id: projectId,
          email_id: shareEmail,
        })
      );
    }

    if (response.payload.status === 201) {
      enqueueSnackbar(response.payload.message, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.payload.message, { variant: "error" });
    }

    setShowShareDialog(false);
    setShareEmail("");
    setSharePermission("viewer");
  };

  const handleSharePermissionChange = (e) => {
    setSharePermission(e.target.value);
  };

  return (
    <Box
      sx={{
        width: "25%",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Button
        variant="contained"
        sx={{ width: "50%" }}
        onClick={handleStarProject}
      >
        {isProjectStarred ? (
          <Star size={20} className="menu__icon" />
        ) : (
          <StarBorder size={20} className="menu__icon" />
        )}
        Star
      </Button>
      {hasWriteAccess === 2 && (
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={handleShareDialogOpen}
        >
          <Share size={20} className="menu__icon" />
          Share
        </Button>
      )}
      <Box sx={{ overflowX: "scroll" }}>
        <Typography variant="body1" sx={{ padding: "10px" }}>
          {pythonVersionLoading && "Loading..."}
          {!pythonVersionLoading &&
            pythonVersion !== null &&
            pythonVersion.version}
        </Typography>
        <Typography variant="body1" sx={{ padding: "10px" }}>
          {outputLoading && "Loading..."}
          {!outputLoading && output !== null && (
            <Typography variant="body1">
              Output: <br />
              {output !== null && output.error !== "" ? (
                <pre>{output.error}</pre>
              ) : (
                <pre>{output.output}</pre>
              )}
            </Typography>
          )}
          {!outputLoading && output !== null && output.error !== "" && (
            <Button
              variant="contained"
              onClick={() => {
                const errorList = output.error.split("\n");
                const errorMsg = errorList[errorList.length - 2];
                window.open(`/details/q=${errorMsg}`, "_blank");
              }}
            >
              Search in stackoverflow
            </Button>
          )}
        </Typography>
      </Box>

      {showShareDialog && (
        <Dialog open={showShareDialog} onClose={handleShareDialogClose}>
          <DialogContent>
            <DialogContentText>Share with someone</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="shareemail"
              label="Collaborator email id"
              type="text"
              fullWidth
              variant="standard"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
            />
            <InputLabel id="permission-select">Permission</InputLabel>
            <Select
              labelId="permission-select"
              id="demo-simple-select"
              defaultValue="viewer"
              value={sharePermission}
              label="Age"
              onChange={handleSharePermissionChange}
            >
              <MenuItem value="viewer">Viewer</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShareDialogClose}>Cancel</Button>
            <Button onClick={handleShareDialogSubmit}>Share</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default OutputWindow;
