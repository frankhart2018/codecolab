import * as React from "react";
import Box from "@mui/material/Box";
import {AppBar, InputBase, Link} from "@mui/material";

import {useSelector} from "react-redux";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "./ToolBar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function NavBar() {
  const { currentUser } = useSelector((state) => state.userDetails)
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ flex: 1 }} >
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href={'/'}
            sx={{ fontSize: 24 }}
          >
            Code Connect
          </Link>
          </Box>
          <Box sx={{ flex: 3 }} >
          <Container >
            <InputBase
                id="search-bar"
                className="text"
                placeholder="Search for users"
                fullWidth={true}
                sx={{backgroundColor:"white", border: 1, borderRadius: 2, boxShadow: 1}}
            />

          </Container>
          </Box>
            <Box sx={{ flex: 1 }} >
              <IconButton type="button" sx={{ p: '10px', color:"white"}} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>

          {!currentUser &&
              <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
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
                    sx={{...rightLink, color: 'secondary.main'}}
                >
                  Sign Up
                </Link>
              </Box>
          }
          {currentUser &&
              <>
              <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                <Link
                    color="inherit"
                    variant="h6"
                    underline="none"
                    href={"/all-projects"}
                    sx={rightLink}
                >
                  My Projects
                </Link>
                <Link
                    variant="h6"
                    underline="none"
                    href={"/profile"}
                    sx={rightLink}
                >
                  Profile
                </Link>
              </Box>
              </>
          }

        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
