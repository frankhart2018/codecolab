import { Box, Typography } from "@mui/material";

const OutputWindow = () => {
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
        Output
      </Typography>
    </Box>
  );
};

export default OutputWindow;
