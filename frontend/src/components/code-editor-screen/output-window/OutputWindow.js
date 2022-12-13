import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Star, StarBorder, Share } from "@mui/icons-material";

import { getPythonVersionThunk } from "../../../services/pyrunner-thunk";
import {
  isProjectStarredThunk,
  starProjectThunk,
  unstarProjectThunk,
} from "../../../services/project-thunk";

const OutputWindow = ({ hasWriteAccess }) => {
  const { pythonVersion, pythonVersionLoading } = useSelector(
    (state) => state.pyrunner
  );
  const { currentUser } = useSelector((state) => state.userDetails);
  const { output, outputLoading } = useSelector((state) => state.run);
  const { isProjectStarred } = useSelector((state) => state.project);

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
      {hasWriteAccess && (
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          onClick={handleStarProject}
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
    </Box>
  );
};

export default OutputWindow;
