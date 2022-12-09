import React from "react";
import Container from '@mui/material/Container';
import { ListItem, Stack, Typography } from "@mui/material";
import Button from "./form/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {logoutUserThunk} from "../../services/thunks";

const HomePage = () => {
    const { currentUser } = useSelector((state) => state.userDetails)
    return (
        <>
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    CODE. ANYWHERE. ANYTIME.
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    A collaborative code editor to allow you to code together over the internet
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    {!currentUser &&
                        <>
                        <Button variant="contained">Get Started</Button>
                        <Button variant="outlined">Login</Button>
                        </>
                    }
                </Stack>
            </Container>
        </Box>
        <Container sx={{ py: 5 }} maxWidth="md">
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="Project ID - 1"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Description of project
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {/*<Divider variant="inset" component="li" />*/}
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="Project ID - 2"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Description of project
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </Container>
    </>
    )
}

export default HomePage;
