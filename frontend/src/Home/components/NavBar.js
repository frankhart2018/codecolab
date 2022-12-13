import * as React from "react";
import Box from "@mui/material/Box";

import { AppBar, InputBase, Link, Menu, MenuItem, Paper } from "@mui/material";
import Toolbar from "./ToolBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { logoutUserThunk } from "../../services/thunks";
import { useEffect } from "react";
import { useState } from "react";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};


function NavBar() {
  const { currentUser } = useSelector((state) => state.userDetails)
  const initials = currentUser?.name?.split(" ").map((name) => name[0]).join("")
  const [name, setName] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [searchUser, setSearchUser] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    if (currentUser?.name) {
      setName(currentUser.name)
    }
  }
    , [currentUser?.name])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  }

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logoutUserThunk());
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 15) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar({ name }) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
    };
  }
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
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', float: 'right', maxWidth: 400 }}

            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for users"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                inputProps={{ 'aria-label': 'Search for users' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon onClick={() => navigate(`/profile/${searchUser}`)} />
              </IconButton>
            </Paper>
          </Box>

          {!currentUser &&
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                sx={{ ...rightLink, color: 'secondary.main' }}
              >
                Sign Up
              </Link>
            </Box>
          }
          {currentUser &&
            <>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'flex-end' }}>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  href={"/all-projects"}
                  sx={rightLink}
                >
                  My Projects
                </Link>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar {...stringAvatar({ name })}>{initials}</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleOpenProfile} >
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          }

        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
