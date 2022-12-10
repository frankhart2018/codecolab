import {IconButton, ListItem, Stack, Typography} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function AllProjects() {
  const { currentUser } = useSelector((state) => state.userDetails)
  return (
    <React.Fragment>
      <NavBar />
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 5,
                pb: 3,
                mt: 10,
                flexGrow: 1
            }}
        >
            <Container>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                >
                    <Container>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            All Projects
                        </Typography>
                        {currentUser &&
                            <Typography
                                variant="inherit"
                                noWrap
                                component="div"
                                color="text.secondary"
                                sx={{display: {xs: 'none', sm: 'block'}}}
                            >
                                {currentUser.username}/
                            </Typography>
                        }
                    </Container>
                    <Container>
                        <Stack
                            direction="row-reverse"
                            spacing={2}
                            alignItems="right"
                        >
                            <IconButton aria-label="delete" size="large">
                                <AddCircleRoundedIcon fontSize="large" />
                            </IconButton>
                        </Stack>
                    </Container>
                </Stack>
            </Container>
            <Container>
                <List>
                    <ListItem>
                        <Box
                            sx={{
                                width: "100%",
                                height: 50,
                                backgroundColor: 'lightgrey',
                                '&:hover': {
                                    backgroundColor: 'grey',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                color="text.secondary"
                                sx={{pt:1.5, pl:1, display: {xs: 'none', sm: 'block'}}}
                            >
                                First Project
                            </Typography>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box
                            sx={{
                                width: "100%",
                                height: 50,
                                backgroundColor: 'lightgrey',
                                '&:hover': {
                                    backgroundColor: 'grey',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >Second project</Box>
                    </ListItem>
                </List>
            </Container>
        </Box>
    </React.Fragment>
  );
}

export default AllProjects;
