import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { getPythonVersionThunk } from "../../../services/pyrunner-thunk";

const OutputWindow = () => {
  const { pythonVersion, pythonVersionLoading } = useSelector(
    (state) => state.pyrunner
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPythonVersionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        width: "25%",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Typography variant="body1" sx={{ padding: "10px" }}>
        {pythonVersionLoading && "Loading..."}
        {!pythonVersionLoading &&
          pythonVersion !== null &&
          pythonVersion.version}
      </Typography>
    </Box>
  );
};

export default OutputWindow;
