import * as Icon from "react-feather";
import Button from "@mui/material/Button";

const RunTaskBar = ({ handleRunCode }) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={handleRunCode}
      >
        <Icon.Play size={20} className="menu__icon" />
        Run
      </Button>
    </>
  );
};

export default RunTaskBar;
