import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar, Link } from "@mui/material";
import Toolbar from "./ToolBar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function NavBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ fontSize: 24 }}
          >
            Codify
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href={"/login"}
              sx={rightLink}
            >
              Sign In
            </Link>
            <Link
              variant="h6"
              underline="none"
              href={"/sign-up"}
              sx={{ ...rightLink, color: "secondary.main" }}
            >
              Sign Up
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
