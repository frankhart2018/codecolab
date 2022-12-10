import {logoutUserThunk} from "../../services/thunks";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import * as React from "react";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import {Card, CardContent, Divider, Grid, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";


const ProfilePage = () => {
    const { currentUser } = useSelector((state) => state.userDetails)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutUserThunk());
    }

    const WelcomeCard = () => {
        return (
        <>
            <Box sx={{ pt: 10 }}>
                <Card variant="outlined" align="center">
                    <CardContent>
                        <Typography sx={{fontSize: 24}} component="div">
                            Welcome {currentUser.name}
                        </Typography>
                    </CardContent>
                    <Box justifyContent={"center"}>
                        <Stack
                            justifyContent={"center"}
                            direction="row"
                            spacing={2}
                            pb={2}
                        >
                            <Link to="/edit-profile" style={{ textDecoration: 'none' }}>
                                <Button variant="contained">Edit profile</Button>
                            </Link>
                            <Link to="/logout" style={{ textDecoration: 'none' }}>
                                <Button onClick={handleLogout} variant="outlined">Logout</Button>
                            </Link>
                        </Stack>
                    </Box>
                </Card>
            </Box>
        </>
        )
    }

    const ProfileInfoCard = () => {
        return (
            <>
                <Box sx={{ pt: 10 }}>
                    <Card variant="outlined" align="center">
                        <CardContent>
                            <Typography sx={{fontSize: 18}} component="div">
                                <Grid container spacing={2} pb={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Name
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {currentUser.name}
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <Grid container spacing={2} pt={2} pb={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Username
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {currentUser.username}
                                    </Grid>
                                </Grid>
                                <Divider/>
                                <Grid container spacing={2} pt={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Email
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {currentUser.email}
                                    </Grid>
                                </Grid>
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </>
        )
    }

    return(
        <div>
            <NavBar/>
            {currentUser &&
                <>
                    <Box justifyContent={"center"}>
                        <Container>
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <WelcomeCard/>
                            </Grid>
                            <Grid item md={8}>
                                <ProfileInfoCard/>
                            </Grid>
                        </Grid>
                        </Container>
                    </Box>
                </>
            }
        </div>
    )
}

export default ProfilePage;