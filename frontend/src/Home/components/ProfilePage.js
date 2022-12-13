import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import StarredProjects from "./StarredProjects";
import NavBar from "./NavBar";
const ProfilePage = () => {
    const { currentUser } = useSelector((state) => state.userDetails)
    const [name, setName] = useState("")


    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name)
        }
    }
        , [currentUser])


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
                width: 100, height: 100,
            },
        };
    }




    const WelcomeCard = () => {
        return (
            <>
                <Box sx={{ p: 1 }}>
                    <Card variant="outlined" align="center" >
                        <CardContent>
                            <Avatar
                                alt="profile picture"
                                {...stringAvatar({ name: currentUser.name })}
                            />
                            <Typography sx={{ fontSize: 24 }} component="div">
                                {name}
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
                            </Stack>
                        </Box>
                    </Card>
                </Box >
            </>
        )
    }

    const ProfileInfoCard = () => {
        return (
            <>
                <Box sx={{ p: 1 }}>
                    <Card variant="outlined" align="center" >
                        <CardContent>

                            <><Typography sx={{ fontSize: 18 }} component="div">
                                <Grid container spacing={2} pb={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Name
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {currentUser.name}
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid container spacing={2} pt={2} pb={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Username
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {currentUser.username}
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid container spacing={2} pt={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Email
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {currentUser.email}
                                    </Grid>
                                </Grid>
                            </Typography></>

                        </CardContent>
                    </Card>
                </Box>
            </>
        )
    }

    return (
        <div>
            <NavBar />
            {currentUser &&
                <>
                    <Box justifyContent={"center"}>
                        <Container maxWidth="lg">
                            <Grid container spacing={4} sx={{ paddingTop: 5 }}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography variant="h1" component="div" align="left" gutterBottom>
                                        <u>Profile</u>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography variant="body1" component="div" align="left" gutterBottom>
                                        User information
                                    </Typography>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12} lg={4} sm={12} md={4} >
                                    <WelcomeCard />
                                </Grid>
                                <Grid item xs={12} lg={8} sm={12} md={8} >
                                    <ProfileInfoCard />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{ paddingTop: 5 }}>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Typography variant="h1" component="div" align="left" gutterBottom>
                                        <u>Starred-Projects</u>
                                    </Typography>

                                </Grid>
                                <Grid item xs={12} sm={12} md={12} >
                                    <StarredProjects />

                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </>
            }
        </div >
    )
}

export default ProfilePage;