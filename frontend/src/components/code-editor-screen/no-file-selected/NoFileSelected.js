import { Box } from "@mui/material";
import "./NoFileSelected.css";

const NoFileSelected = ({ message = "Code Connect" }) => {
  return (
    <Box className="container-div">
      <p>{message}</p>
    </Box>
  );
};

export default NoFileSelected;
