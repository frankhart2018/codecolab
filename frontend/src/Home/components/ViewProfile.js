import { useSelector } from "react-redux";
import * as React from "react";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import { Avatar, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";

const ViewProfile = () => {
    const pathName = window.location.pathname;
    const findUsername = pathName.split("/")[2];
    console.log("findUsername", findUsername)
    const { currentUser } = useSelector((state) => state.userDetails)
    console.log("currentUser", currentUser)
    const [user, setUser] = useState({
        name: "", email: "", username: "", id: ""
    })


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/search-user/${findUsername}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("data", data.users)
                const res = {
                    name: data.users.name,
                    email: data.users.email,
                    username: data.users.username,
                    id: data.users._id,
                }
                setUser(res)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [findUsername]);

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


    console.log("user", user)

    const WelcomeCard = () => {
        return (
            <>
                <Box sx={{ p: 1 }}>
                    <Card variant="outlined" align="center" >
                        <CardContent>
                            <Avatar
                                alt="profile picture"
                                {...stringAvatar({ name: user.name })}
                            />
                            <Typography sx={{ fontSize: 24 }} component="div">
                                {user?.name}
                            </Typography>
                        </CardContent>

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
                                        {user.name}
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Grid container spacing={2} pt={2} pb={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Username
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {user.username}
                                    </Grid>
                                </Grid>
                                {currentUser && <Divider />}
                                {currentUser && <Grid container spacing={2} pt={2}>
                                    <Grid item xs={6} md={4} textAlign='left'>
                                        Email
                                    </Grid>
                                    <Grid item xs={6} md={8} textAlign='left'>
                                        {user.email}
                                    </Grid>
                                </Grid>}
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

            <Box justifyContent={"center"}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} sx={{ paddingTop: 5 }}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h1" component="div" align="left" gutterBottom>
                                <u>View Profile</u>
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
                </Container>
            </Box>

        </div >
    )
}

export default ViewProfile;