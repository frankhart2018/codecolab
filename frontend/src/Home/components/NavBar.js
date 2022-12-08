import * as React from 'react';
import Box from '@mui/material/Box';
import { AppBar, Link } from '@mui/material';
import Toolbar from './ToolBar';
import {useDispatch, useSelector} from "react-redux";
import {logoutUserThunk} from "../../services/thunks";

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

function NavBar() {
    const { currentUser } = useSelector((state) => state.userDetails)
    const dispatch = useDispatch()
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        sx={{ fontSize: 24 }}
                    >
                        Codify
                    </Link>
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
                        <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href={"/profile"}
                                sx={rightLink}
                            >
                                Profile
                            </Link>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div >
    );
}

export default NavBar;