import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { StarBorder, Star } from "@mui/icons-material";

const RunTaskBar = ({ handleRunCode }) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={handleRunCode}
      >
        <PlayArrowIcon size={20} className="menu__icon" />
        Run
      </Button>
    </>
  );
};

export default RunTaskBar;
